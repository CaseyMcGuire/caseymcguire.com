import {useState} from "react";
import Modal from "components/Modal/Modal";
import WikiItemActionsButton from "apps/Wiki/components/WikiItemActionsButton";
import * as stylex from "@stylexjs/stylex";
import {graphql, useMutation} from "react-relay";
import {WikiPageActionsButtonMutation} from "__generated__/relay/WikiPageActionsButtonMutation.graphql";
import Button from "components/buttons/Button";

type Props = {
  pageId: string,
  pageName: string
}

const styles = stylex.create({
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 24,
    minHeight: 150,
    maxWidth: 400
  },
  textContainer: {
    marginBottom: 12
  },
  modalContents: {
    flexGrow: 1,
    marginBottom: 12,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    fontFamily: 'inherit',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'rgb(55, 65, 81)',
    fontSize: 18,
    fontWeight: 500,
    width: '100%',
    padding: 8
  },
  deleteButtonContainer: {
    marginRight: 8
  }
})

export default function WikiPageActionsButton(props: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <WikiItemActionsButton
        canDelete={true}
        onDelete={() => {
          setModalOpen(true)
        }
        }
      />
      <DeleteWikiPageModal
        isOpen={modalOpen}
        pageId={props.pageId}
        pageName={props.pageName}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

type DeleteWikiPageModalProps = {
  isOpen: boolean,
  pageId: string,
  pageName: string,
  onClose: () => void
}

function DeleteWikiPageModal(props: DeleteWikiPageModalProps) {
  const [inputText, setInputText] = useState<string>("");
  const [commitDeletePage, isDeleteInFlight] = useMutation<WikiPageActionsButtonMutation>(
    graphql`
      mutation WikiPageActionsButtonMutation($itemId: ID!) {
        deleteWikiItem(itemId: $itemId) {
          __typename
          ... on SuccessfulDeleteWikiItem {
            wiki {
              ...WikiSidebar_wiki
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
    <Modal isVisible={props.isOpen}>
      <div  {...stylex.props(styles.modalContainer)}>
        <div {...stylex.props(styles.modalContents)}>
          <div {...stylex.props(styles.textContainer)}>
            Are you sure you want to delete the page <strong>{props.pageName}</strong>?
            If so, enter the page name in the box below to confirm.
          </div>
          <input
            {...stylex.props(styles.input)}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div {...stylex.props(styles.buttonContainer)}>
          <div {...stylex.props(styles.deleteButtonContainer)}>
            <Button
              text={"Delete"}
              style={'danger'}
              state={inputText === props.pageName ? 'active' : 'disabled'}
              onClick={() => {
                if (isDeleteInFlight || inputText !== props.pageName) {
                  return;
                }
                commitDeletePage({
                  variables: {itemId: props.pageId},
                  onCompleted: (response) => {
                    switch (response.deleteWikiItem?.__typename) {
                      case "SuccessfulDeleteWikiItem":
                        console.log("success");
                        break;
                      case "FailedWikiResponse":
                        console.error(response.deleteWikiItem.userFacingErrorMessage);
                        break;
                    }
                    props.onClose();
                  }
                })
              }}
            />
          </div>
          <Button
            text={"Cancel"}
            style={'light'}
            onClick={() => {
              props.onClose();
            }}
          />
        </div>
      </div>
    </Modal>
  )
}