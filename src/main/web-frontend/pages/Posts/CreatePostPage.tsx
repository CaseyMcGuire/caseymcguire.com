import * as React from "react";
import PostCreationContainer from "./components/PostCreationContainer";
import {commit} from "../../mutations/CreateOrEditPostMutation";

export default function CreatePostPage() {
  return (
    <div>
      <PostCreationContainer onSubmit={(title, content) => {
        commit(null, title, content, (id: number | null) => {
          console.log(id)
        })
      }} />
    </div>
  )
}