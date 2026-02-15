import * as React from "react";
import {useContext, useMemo, useState} from "react";
import {graphql, useMutation} from "react-relay";
import {Navigate, useNavigate} from "react-router";
import * as stylex from "@stylexjs/stylex";
import {WikiStyles} from "apps/Wiki/components/WikiStyles.stylex";
import UserContext from "components/context/UserContext";
import Button from "components/buttons/Button";
import WikiPageWrapper from "apps/Wiki/components/WikiPageWrapper";
import {NewWikiPageMutation} from "__generated__/relay/NewWikiPageMutation.graphql";

const styles = stylex.create({
  page: {
    minHeight: "100vh",
    backgroundColor: "rgb(255, 255, 255)",
  },
  content: {
    paddingTop: WikiStyles.headerHeight,
  },
  container: {
    maxWidth: 720,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },
  card: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: WikiStyles.borderColor,
    borderRadius: 12,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 8,
    color: "rgb(17, 24, 39)",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: "rgb(55, 65, 81)",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(209, 213, 219)",
    fontSize: 16,
    fontFamily: "inherit",
    color: "rgb(17, 24, 39)",
  },
  helperText: {
    marginTop: 8,
    fontSize: 13,
    color: "rgb(107, 114, 128)",
  },
  urlPreview: {
    marginTop: 6,
    display: "inline-block",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6,
    backgroundColor: "rgb(243, 244, 246)",
    fontSize: 12,
    color: "rgb(31, 41, 55)",
    fontFamily: "monospace",
  },
  errorText: {
    marginTop: 12,
    color: "rgb(185, 28, 28)",
    fontSize: 14,
  },
  actions: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-end",
  },
  gatedMessage: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgb(209, 213, 219)",
    borderRadius: 12,
    padding: 24,
    color: "rgb(107, 114, 128)",
    fontSize: 15,
  },
});

export default function NewWikiPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const isAdmin = context.user?.isAdmin === true;

  const [commit, isInFlight] = useMutation<NewWikiPageMutation>(graphql`
    mutation NewWikiPageMutation($name: String!) {
      createWiki(name: $name) {
        __typename
        ... on SuccessfulCreateWikiResponse {
          wiki {
            id
            name
          }
        }
        ... on FailedWikiResponse {
          userFacingErrorMessage
        }
      }
    }
  `);

  const trimmedName = name.trim();

  const handleCreate = () => {
    if (isInFlight) {
      return;
    }
    if (!trimmedName) {
      setError("Wiki name is required.");
      return;
    }

    setError(null);
    commit({
      variables: {
        name: trimmedName,
      },
      onCompleted: response => {
        switch (response.createWiki.__typename) {
          case "SuccessfulCreateWikiResponse": {
            const nextPath = `/wiki/${response.createWiki.wiki.id}`;
            navigate(nextPath);
            break;
          }
          case "FailedWikiResponse":
            setError(response.createWiki.userFacingErrorMessage);
            break;
          default:
            setError("Something went wrong. Please try again.");
            break;
        }
      },
      onError: err => {
        console.error(err);
        setError("Something went wrong. Please try again.");
      },
    });
  };

  const buttonState = isInFlight ? "loading" : trimmedName ? "active" : "disabled";

  if (!isAdmin) {
    return <Navigate to="/wiki" replace />;
  }

  return (
    <WikiPageWrapper>
      <div {...stylex.props(styles.content)}>
        <div {...stylex.props(styles.container)}>
          <h1 {...stylex.props(styles.title)}>Create a new wiki</h1>
          <div {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.inputLabel)}>Wiki name</div>
            <input
              {...stylex.props(styles.input)}
              type="text"
              placeholder="e.g. My Wiki"
              value={name}
              onChange={event => {
                setName(event.target.value);
                if (error) {
                  setError(null);
                }
              }}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  handleCreate();
                }
              }}
            />
            {error && <div {...stylex.props(styles.errorText)}>{error}</div>}
            <div {...stylex.props(styles.actions)}>
              <Button
                text="Create wiki"
                state={buttonState}
                onClick={handleCreate}
              />
            </div>

          </div>
        </div>
      </div>
    </WikiPageWrapper>
  );
}
