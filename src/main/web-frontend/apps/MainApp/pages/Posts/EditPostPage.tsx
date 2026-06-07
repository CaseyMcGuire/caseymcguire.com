import PostCreationContainer from "apps/MainApp/pages/Posts/components/PostCreationContainer";
import * as React from "react";
import * as CreateOrEditPostMutation from "apps/MainApp/mutations/CreateOrEditPostMutation";
import { useNavigate} from "react-router";
import {graphql, QueryRenderer} from "react-relay";
import {EditPostPageQuery} from "__generated__/relay/EditPostPageQuery.graphql";
import Page from "apps/MainApp/components/Page";
import {useParams} from "react-router";
import {redirect} from "react-router";
import {useLazyLoadQuery} from "react-relay/hooks";
import {CaseyMcGuireRoutes} from "__generated__/routes/CaseyMcGuireRoutes";


export default function EditPostPage() {
  const params = useParams();
  const idStr = params.id
  if (idStr == null) {
    redirect(CaseyMcGuireRoutes.NotFound())
    return null;
  }
  const id = parseInt(idStr);
  if (Number.isNaN(id)) {
    redirect(CaseyMcGuireRoutes.NotFound())
    return null;
  }
  return <EditPostPageImpl id={id} />
}

function EditPostPageImpl(props: {id: number}) {
    const query = graphql`
      query EditPostPageQuery($postId: Int!) {
        post(id: $postId) {
          title
          contents
        }
      }
    `

  const navigate = useNavigate();
  const id = props.id;
  const response = useLazyLoadQuery<EditPostPageQuery>(query, {
    postId: id
  });
  const title = response.post?.title;
  const contents = response.post?.contents;
  return (
    <Page>
      <div>
        <PostCreationContainer title={title} content={contents} onSubmit={(title, content) => {
          CreateOrEditPostMutation.commit(id, title, content, (id: number | null) => {
            if (id == null) {
              console.log("error... ")
            }
            else {
              navigate(CaseyMcGuireRoutes.ViewPost({ id }))
            }
          })
        }}/>
      </div>
    </Page>
  )
}
