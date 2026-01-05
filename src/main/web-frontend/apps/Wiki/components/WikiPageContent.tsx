import {graphql} from "react-relay";
import {useFragment} from "react-relay/hooks";
import {WikiPageContent_page$key} from "__generated__/relay/WikiPageContent_page.graphql";
import * as stylex from "@stylexjs/stylex";
import {WikiStyles} from "./WikiStyles.stylex";
import {useMemo} from "react";
import {convertMarkdownToHtml} from "utils/MarkdownUtils";
import 'assets/stylesheets/markdown.css'
import WikiTableOfContents from "apps/Wiki/components/WikiTableOfContents";
import WikiPageBody from "apps/Wiki/components/WikiPageBody";

type Props = {
  wikiPage?: WikiPageContent_page$key | null,
  wikiName: string,
  pageId: string
}

const styles = stylex.create({
  container: {
    width: '100%',
    marginLeft: WikiStyles.sidebarWidth,
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
  },
  footer: {
    height: 100,
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

  // adding padding/margin made the table of contents scroll into the header. Using a div with a fixed height seems to
  // work.
  return (
    <div {...stylex.props(styles.container)}>
    <div {...stylex.props(styles.body)}>
      <WikiPageBody pageId={props.pageId} showEditButton={true} wikiName={props.wikiName} title={data?.name ?? ''} html={result.html}/>
      <WikiTableOfContents headings={result.tableOfContents}/>
    </div>
      <div {...stylex.props(styles.footer)} />
    </div>
  );
}