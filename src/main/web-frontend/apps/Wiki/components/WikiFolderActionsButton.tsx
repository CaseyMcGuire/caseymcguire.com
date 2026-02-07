import React, {useRef, useState} from "react";
import WikiItemActionsButton from "apps/Wiki/components/WikiItemActionsButton";
import {graphql, useMutation} from "react-relay";
import {WikiFolderActionsButtonMutation} from "__generated__/relay/WikiFolderActionsButtonMutation.graphql";

type Props = {
  folderId: string,
  isFolderEmpty: boolean,
}

export default function WikiFolderActionsButton(props: Props) {
  const [commitDeleteFolder, isDeleteInFlight] = useMutation<WikiFolderActionsButtonMutation>(
    graphql`
      mutation WikiFolderActionsButtonMutation($itemId: ID!) {
        deleteWikiItem(itemId: $itemId) {
          __typename
          ... on SuccessfulDeleteWikiItem {
            wiki {
              ...WikiSidebarFragment_wiki
            }
          }
          ... on FailedWikiResponse {
            userFacingErrorMessage
          }
        }
      }
    `
  );

  return (
    <WikiItemActionsButton
      canDelete={props.isFolderEmpty && !isDeleteInFlight}
      onDelete={() => {
        commitDeleteFolder({
          variables: { itemId: props.folderId },
          onCompleted: (response) => {
            switch (response.deleteWikiItem?.__typename) {
              case "SuccessfulDeleteWikiItem":
                console.log("success");
                break;
              case "FailedWikiResponse":
                console.error(response.deleteWikiItem.userFacingErrorMessage);
                break;
            }
          },
          onError: (error) => {
            console.error(error);
          }
        });
      }} />
  )
}
