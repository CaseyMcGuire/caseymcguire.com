import {graphql, useMutation} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {Navigate, useNavigate, useParams} from "react-router";
import WikiPageBody from "apps/Wiki/components/WikiPageBody";
import {useMemo, useState} from "react";
import {convertMarkdownToHtml} from "utils/MarkdownUtils";
import {EditWikiPageQuery} from "__generated__/relay/EditWikiPageQuery.graphql";
import * as stylex from "@stylexjs/stylex";
import Button from "components/buttons/Button";
import {EditWikiPageMutation} from "__generated__/relay/EditWikiPageMutation.graphql";
import WikiPageWrapper from "apps/Wiki/components/WikiPageWrapper";

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 12
  },
  textAreaContainer: {
    padding: 12,
    flexGrow: 1,
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderColor: 'rgb(192,194,197)',
    maxWidth: 800,
  },
  textArea: {
    width: "100%",
    height: "100%",
    resize: 'none',
    outline: 'none',
    borderColor: 'rgb(192,194,197)',
    borderRadius: 5,
    padding: 4
  },
  nameInputContainer: {
    marginBottom: 8
  },
  nameInput: {
    borderColor: 'rgb(192,194,197)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: 5,
    width: '100%',
    padding: 5
  },
  bodyContainer: {
    padding: 12
  },
  buttonContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
})

export default function EditWikiPage() {

  const query = graphql`
    query EditWikiPageQuery($pageId: ID!) {
      page: wikiPageById(id: $pageId) {
        id
        name
        content
      }
    }
  `;

  const mutation = graphql`
    mutation EditWikiPageMutation(
      $id: ID!,
      $name: String!,
      $contents: String!) {
      updateWikiPageContent(
        pageId: $id,
        name: $name,
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

  const {wikiName, pageId} = useParams<{ wikiName: string, pageId: string }>();
  if (!wikiName || !pageId) {
    return <Navigate to="/wiki/404" replace />;
  }
  const navigate = useNavigate();

  const data = useLazyLoadQuery<EditWikiPageQuery>(query, {
    pageId: pageId!
  });
  const [commit, isInFlight] = useMutation<EditWikiPageMutation>(mutation);

  const [contents, setContents] = useState(data?.page?.content ?? '');
  const [name, setName] = useState(data?.page?.name ?? '');

  const result = useMemo(() => {
    return convertMarkdownToHtml(contents);
  }, [contents]);

  const handleSaveClick = () => {
    if (isInFlight) {
      return;
    }

    commit({
      variables: {
        id: pageId!,
        contents,
        name
      },
      onCompleted: data => {
        switch (data.updateWikiPageContent.__typename) {
          case 'SuccessfulUpdateWikiPageContentResponse':
            setContents(data.updateWikiPageContent.wikiPage.content);
            navigate(`/wiki/${wikiName}/${pageId}`);
            break;
          case 'FailedWikiResponse':
            console.log(data.updateWikiPageContent.userFacingErrorMessage);
        }
      }
    })
  }


  return (
    <WikiPageWrapper wikiName={wikiName}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.textAreaContainer)}>
          <div {...stylex.props(styles.nameInputContainer)}>
            <input
              {...stylex.props(styles.nameInput)}
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>
          <textarea
            {...stylex.props(styles.textArea)}
            value={contents}
            onChange={event => setContents(event.target.value)}
          />
          <div {...stylex.props(styles.buttonContainer)}>
            <Button
              text="Save"
              onClick={handleSaveClick}
              state={isInFlight ? 'loading' : 'active'}
            />
          </div>
        </div>
        <div {...stylex.props(styles.bodyContainer)}>
          <WikiPageBody pageId={pageId!} showEditButton={false} wikiName={""} title={name} html={result.html}/>
        </div>
      </div>
    </WikiPageWrapper>
  )
}