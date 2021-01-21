import * as React from "react";
import PostCreationContainer from "./components/PostCreationContainer";
import {commit} from "../../mutations/CreateOrEditPostMutation";
import {useHistory} from "react-router-dom";
import Page from "../Page/Page";

export default function CreatePostPage() {
  const history = useHistory();
  return (
    <Page>
    <div>
      <PostCreationContainer onSubmit={(title, content) => {
        commit(null, title, content, (id: number | null) => {
          if (id == null) {
            console.log("error... ")
          }
          else {
            history.push("/posts/" + id)
          }
        })
      }} />
    </div>
    </Page>
  )
}