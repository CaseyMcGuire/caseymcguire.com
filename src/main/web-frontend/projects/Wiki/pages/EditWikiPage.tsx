import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {useParams} from "react-router";
import WikiPageBody from "projects/Wiki/components/WikiPageBody";
import {useMemo, useState} from "react";
import {convertMarkdownToHtml} from "utils/MarkdownUtils";
import {EditWikiPageQuery} from "__generated__/relay/EditWikiPageQuery.graphql";
import * as stylex from "@stylexjs/stylex";
import WikiButton from "projects/Wiki/components/WikiButton";
import {commit} from "projects/Wiki/mutations/UpdateWikiPageMutation";

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
  const { pageId } = useParams<{pageId: string}>();

  const data = useLazyLoadQuery<EditWikiPageQuery>(query, {
    pageId: pageId!
  });

  const [contents, setContents] = useState(data?.page?.content ?? '');
  const title = data?.page?.name ?? '';

  const result = useMemo(() => {
    return convertMarkdownToHtml(contents);
  }, [contents]);

  const handleSaveClick = () => {
    commit(pageId!, "", contents, (success) => {
      console.log(success);
    })
  }


  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.textAreaContainer)}>
        <textarea
          {...stylex.props(styles.textArea)}
          defaultValue={contents}
          onChange={event => setContents(event.target.value)}
        />
        <div {...stylex.props(styles.buttonContainer)}>
          <WikiButton
            text="Save"
            onClick={handleSaveClick}
          />
        </div>
      </div>
      <div {...stylex.props(styles.bodyContainer)}>
        <WikiPageBody title={title} html={result.html} />
      </div>
    </div>
  )
}