import * as React from "react";
import PostCreationContainer from "./components/PostCreationContainer";

export default function CreatePostPage() {
  return (
    <div>
      <PostCreationContainer onSubmit={(title, content) => {
        console.log(title)
        console.log(content)
      }} />
    </div>
  )
}