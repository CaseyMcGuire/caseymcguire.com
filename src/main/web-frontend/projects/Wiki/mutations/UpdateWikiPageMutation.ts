import {graphql} from "react-relay";
import {commitMutation} from "relay-runtime";
import {UpdateWikiPageMutation} from "__generated__/relay/UpdateWikiPageMutation.graphql";
import {RelayConfig} from "relay/RelayConfig";

export function commit(
  id: string,
  title: string,
  contents: string,
  onCompleted: (success: boolean) => void
) {

  const mutation = graphql`
    mutation UpdateWikiPageMutation(
      $id: ID!, 
      $contents: String!) {
      updateWikiPageContent(
        pageId: $id,
        content: $contents
      ) {
        __typename
        ... on SuccessfulUpdateWikiPageContentResponse {
          wikiPage {
            id
            name
            content
          }
        }
        ... on FailedWikiResponse {
          userFacingErrorMessage
        }
      }
    }
  `;

  const variables = {
    id,
    contents
  };

  commitMutation<UpdateWikiPageMutation>(
    RelayConfig.getEnvironment(),
    {
      mutation,
      variables,
      onCompleted: (response) => {
        console.log(response);
        switch (response.updateWikiPageContent.__typename) {
           case "SuccessfulUpdateWikiPageContentResponse":
             onCompleted(true)
             break;
           case "FailedWikiResponse":
             onCompleted(false)
             break;
         }
      }
    }
  )
}