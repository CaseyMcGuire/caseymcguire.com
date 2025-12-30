import {graphql, useMutation} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {useParams} from "react-router";
import WikiPageBody from "projects/Wiki/components/WikiPageBody";
import {useMemo, useState} from "react";
import {convertMarkdownToHtml} from "utils/MarkdownUtils";
import {EditWikiPageQuery} from "__generated__/relay/EditWikiPageQuery.graphql";
import * as stylex from "@stylexjs/stylex";
import Button from "components/buttons/Button";
import {EditWikiPageMutation} from "__generated__/relay/EditWikiPageMutation.graphql";

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

  const { pageId } = useParams<{pageId: string}>();

  const data = useLazyLoadQuery<EditWikiPageQuery>(query, {
    pageId: pageId!
  });
  const [commit, isInFlight] = useMutation<EditWikiPageMutation>(mutation);

  const [contents, setContents] = useState(data?.page?.content ?? '');
  const title = data?.page?.name ?? '';

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
        contents: contents
      },
      onCompleted: data => {
        switch(data.updateWikiPageContent.__typename) {
          case 'SuccessfulUpdateWikiPageContentResponse':
            setContents(data.updateWikiPageContent.wikiPage.content);
            break;
          case 'FailedWikiResponse':
            console.log(data.updateWikiPageContent.userFacingErrorMessage);
        }
      }
    })
  }


  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.textAreaContainer)}>
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
        <WikiPageBody title={title} html={result.html} />
      </div>
    </div>
  )
}