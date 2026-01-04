import * as React from "react";
import {FetchPolicy, graphql} from "react-relay";
import {ShowPostPageQuery} from "__generated__/relay/ShowPostPageQuery.graphql";
import {redirect, useNavigate, useParams} from "react-router";
import Post from "apps/MainApp/pages/Posts/components/Post";
import LoadingPost from "apps/MainApp/pages/Posts/components/LoadingPost";
import Page from "apps/MainApp/components/Page";
import {useLazyLoadQuery} from "react-relay/hooks";
import {useContext} from "react";
import UserContext from "components/context/UserContext";


export default function SinglePostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const idStr = params.id;
  if (idStr == null) {
    navigate("/500")
    return null
  }
  const id = parseInt(idStr);
  if (Number.isNaN(id)) {
    redirect("/404")
    return null;
  }
  const loadingPage = (
    <Page>
      <LoadingPost/>
    </Page>
  )
  return (
    <React.Suspense fallback={loadingPage}>
      <SinglePostPageImpl id={id}/>
    </React.Suspense>
  );
}

function SinglePostPageImpl(props: {
  id: number
}) {
    const query = graphql`
      query ShowPostPageQuery($id: Int!) {
        post(id: $id) {
          title
          contents
          published_date
        }
      }
    `;
    const context = useContext(UserContext);
    const isAdmin = context.user?.isAdmin == true;

    // Since an admin might've just updated a post, always do a refetch lest we get stale data
    let options: { fetchPolicy?: FetchPolicy | undefined } = {
      fetchPolicy: isAdmin ? 'network-only' : 'store-or-network'
    };

  const navigate = useNavigate();
  const response = useLazyLoadQuery<ShowPostPageQuery>(
    query,
    {id: props.id},
    options
  );
  const title = response.post?.title

  const {post} = response;
  if (post == null) {
    navigate("/404");
    return null;
  }
  return (
    <Page title={title}>
      <Post id={props.id}
            title={post.title}
            contents={post.contents}
            publishedDate={post.published_date}
            showEditButton={true}/>
    </Page>
  );
}