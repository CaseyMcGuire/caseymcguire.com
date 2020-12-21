import * as React from "react";
import PostCreationContainer from "./components/PostCreationContainer";
import {commit} from "../../mutations/CreateOrEditPostMutation";
import {useHistory} from "react-router-dom";

export default function CreatePostPage() {
  const history = useHistory();
  return (
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
  )
}