import {graphql} from "react-relay";
import {useFragment} from "react-relay/hooks";
import {WikiPageContent_page$key} from "__generated__/relay/WikiPageContent_page.graphql";
import * as stylex from "@stylexjs/stylex";
import {WikiStyles} from "./WikiStyles.stylex";
import {useMemo} from "react";
import {convertMarkdownToHtml} from "utils/MarkdownUtils";
import 'assets/stylesheets/markdown.css'
import WikiTableOfContents from "projects/Wiki/components/WikiTableOfContents";

type Props = {
  wikiPage?: WikiPageContent_page$key | null
}

const styles = stylex.create({
  body: {
    height: '100%',
    width: '100%',
    marginLeft: WikiStyles.sidebarWidth,
    display: 'flex',
    justifyContent: 'center',
    padding: 16
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    maxWidth: '900px',
  }
})

export default function WikiPageContent(props: Props) {
  const data = useFragment(
    graphql`
      fragment WikiPageContent_page on GqlWikiPage {
        name
        content
      }
    `,
    props.wikiPage
  )

  const contents = data?.content ?? '';

  const result = useMemo(() => {
    return convertMarkdownToHtml(contents);
  }, [contents]);

  return (
    <div {...stylex.props(styles.body)}>
      <div {...stylex.props(styles.contentContainer)}>
        <h1>{data?.name}</h1>
        <div
          {...stylex.props(styles.content)}
          data-post-contents
          dangerouslySetInnerHTML={{ __html: result.html }} />
      </div>
      <WikiTableOfContents headings={result.tableOfContents} />
    </div>
  );
}