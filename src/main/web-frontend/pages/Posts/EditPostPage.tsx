import PostCreationContainer from "./components/PostCreationContainer";
import * as React from "react";
import * as CreateOrEditPostMutation from "../../mutations/CreateOrEditPostMutation";
import {RouteComponentProps, Redirect, useHistory} from "react-router-dom";
import {graphql, QueryRenderer} from "react-relay";
import {RelayConfig} from "../../relay/RelayConfig";
import {EditPostPageQuery} from "../../__generated__/EditPostPageQuery.graphql";


export default function EditPostPage(props: RouteComponentProps<{ id?: string }>) {
    const query = graphql`
      query EditPostPageQuery($postId: Int!) {
        post(id: $postId) {
          title
          contents
        }
      }
    `
  const id = parseInt(props.match.params?.id ?? '');
  const history = useHistory();
  if (Number.isNaN(id)) {
    return <Redirect to={"/"}/>
  }

  return (
    <QueryRenderer<EditPostPageQuery>
      environment={RelayConfig.getEnvironment()}
      query={query}
      render={({error, props}) => {
        if (error) {
          return <Redirect to={"/#error=true"}/>;
        } else if (!props) {
          return <div>Loading...</div>;
        }
        const title = props.post?.title;
        const contents = props.post?.contents;
        return (
          <div>
            <PostCreationContainer title={title} content={contents} onSubmit={(title, content) => {
              CreateOrEditPostMutation.commit(id, title, content, (id: number | null) => {
                if (id == null) {
                  console.log("error... ")
                }
                else {
                  history.push("/posts/" + id)
                }
              })
            }}/>
          </div>
        )
      }} variables={{postId: id}}
    />
  )
}