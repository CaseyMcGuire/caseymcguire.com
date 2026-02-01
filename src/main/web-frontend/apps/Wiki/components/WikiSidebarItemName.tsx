import {useContext, useState} from "react";
import {graphql, useMutation} from "react-relay";
import {WikiSidebarItemNameMutation} from "__generated__/relay/WikiSidebarItemNameMutation.graphql";
import * as stylex from "@stylexjs/stylex";
import UserContext from "components/context/UserContext";

type Props = {
  id: string,
  name: string,
  isEditable: boolean
}

const styles = stylex.create({
  input: {
    fontFamily: 'inherit',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'rgb(55, 65, 81)',
    fontSize: 16,
    fontWeight: 500,
    width: '100%',
  },
  nameContainer: {
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textWrap: 'nowrap'
  }
})

export default function WikiSidebarItemName(props: Props) {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState(props.name);
  const isAdmin = useContext(UserContext)?.user?.isAdmin === true;

  const [commit, isInFlight] = useMutation<WikiSidebarItemNameMutation>(
    graphql`
      mutation WikiSidebarItemNameMutation($id: ID!, $name: String!) {
        updateWikiPageOrFolderName(id: $id, name: $name) {
          __typename
          ... on SuccessfulUpdateWikiPageNameResponse {
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
  )

  if (isActive && !isInFlight && isAdmin && props.isEditable) {
    return <input type="text"
                  {...stylex.props(styles.input)}
                  value={name}
                  onChange={(e) => {
                    e.stopPropagation();
                    setName(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (isInFlight) {
                      return;
                    }

                    if (e.key === "Enter") {
                      const trimmedName = name.trim();
                      if (trimmedName === "" || trimmedName === props.name) {
                        setIsActive(false);
                        setName(props.name);
                        return;
                      }
                      setIsActive(false);
                      commit({
                        variables: {
                          id: props.id,
                          name: trimmedName
                        },
                        onCompleted(data) {
                          switch (data.updateWikiPageOrFolderName.__typename) {
                            case 'SuccessfulUpdateWikiPageNameResponse':
                              console.log("success");
                              break;
                            case 'FailedWikiResponse':
                              console.error(data.updateWikiPageOrFolderName.userFacingErrorMessage);
                              break;
                          }
                        }
                      })
                    }
                  }}
                  onBlur={() => {
                    setIsActive(false)
                    setName(props.name)
                  }}
    />
  }

  return (
    <span
      {...stylex.props(styles.nameContainer)}
      onDoubleClick={() => {
        if (!isAdmin) {
          return;
        }
        setIsActive(true)
      }}>{props.name}</span>
  )
}