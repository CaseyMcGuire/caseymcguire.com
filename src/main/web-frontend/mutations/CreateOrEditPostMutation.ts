import {graphql} from "react-relay";
import {commitMutation} from "relay-runtime";
import {RelayConfig} from "../relay/RelayConfig";
import {CreateOrEditPostMutationResponse} from "../__generated__/CreateOrEditPostMutation.graphql";

export function commit(
  id: number | null,
  title: string,
  content: string,
  onCompleted: (id : number | null) => void
) {
    const mutation = graphql`
      mutation CreateOrEditPostMutation(
        $id: Int,
        $title: String!,
        $content: String!,
      ) {
        postId: createOrEditPost(id: $id, content: $content, title: $title)
      }
    `;

  const variables = {
    id,
    title,
    content
  };

  commitMutation(RelayConfig.getEnvironment(),
    {
      mutation,
      variables,
      onCompleted: (response: CreateOrEditPostMutationResponse, errors) => {
        onCompleted(response.postId)
      }
    });
}