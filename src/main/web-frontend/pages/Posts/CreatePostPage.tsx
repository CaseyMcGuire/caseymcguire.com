import * as React from "react";
import PostCreationContainer from "./components/PostCreationContainer";
import {commit} from "../../mutations/CreateOrEditPostMutation";
import {useNavigate} from "react-router-dom";
import Page from "../Page/Page";

export default function CreatePostPage() {
  const navigate = useNavigate();
  return (
    <Page>
    <div>
      <PostCreationContainer onSubmit={(title, content) => {
        commit(null, title, content, (id: number | null) => {
          if (id == null) {
            console.log("error... ")
          }
          else {
            navigate("/posts/" + id)
          }
        })
      }} />
    </div>
    </Page>
  )
}