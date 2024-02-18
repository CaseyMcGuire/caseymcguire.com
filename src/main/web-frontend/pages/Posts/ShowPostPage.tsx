import * as React from "react";
import {graphql} from "react-relay";
import {ShowPostPageQuery} from "../../__generated__/ShowPostPageQuery.graphql";
import {redirect, useNavigate, useParams} from "react-router-dom";
import Post from "./components/Post";
import LoadingPost from "./components/LoadingPost";
import Page from "../Page/Page";
import {useLazyLoadQuery} from "react-relay/hooks";


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

  const navigate = useNavigate();
  const response = useLazyLoadQuery<ShowPostPageQuery>(
    query,
    {id: props.id}
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