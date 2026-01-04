import * as React from "react";
import PostCreationContainer from "apps/MainApp/pages/Posts/components/PostCreationContainer";
import {commit} from "apps/MainApp/mutations/CreateOrEditPostMutation";
import {useNavigate} from "react-router";
import Page from "apps/MainApp/components/Page";

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