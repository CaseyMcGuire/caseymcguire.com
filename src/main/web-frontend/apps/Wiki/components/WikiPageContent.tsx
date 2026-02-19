import {graphql} from "react-relay";
import {useFragment} from "react-relay/hooks";
import {WikiPageContent_page$key} from "__generated__/relay/WikiPageContent_page.graphql";
import * as stylex from "@stylexjs/stylex";
import {WikiStyles} from "./WikiStyles.stylex";
import {useMemo} from "react";
import {convertMarkdownToHtml} from "utils/MarkdownUtils";
import 'assets/stylesheets/markdown.css'
import WikiPageTableOfContents from "apps/Wiki/components/WikiPageTableOfContents";
import WikiPageBody from "apps/Wiki/components/WikiPageBody";

type Props = {
  wikiPage?: WikiPageContent_page$key | null,
  wikiId: string,
  pageId: string
}

const styles = stylex.create({
  body: {
    width: '100%',
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
    <>
      <div {...stylex.props(styles.body)}>
        <WikiPageBody pageId={props.pageId}
                      showEditButton={true}
                      wikiId={props.wikiId}
                      title={data?.name ?? ''}
                      html={result.html}
        />
        <WikiPageTableOfContents headings={result.tableOfContents}/>
      </div>
      <div {...stylex.props(styles.footer)} />
    </>
  );
}
