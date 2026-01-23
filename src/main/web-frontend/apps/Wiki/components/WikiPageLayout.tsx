import WikiSidebar from "apps/Wiki/components/WikiSidebar";
import {WikiSidebar_wiki$key} from "__generated__/relay/WikiSidebar_wiki.graphql";
import * as stylex from "@stylexjs/stylex";
import WikiPageWrapper from "apps/Wiki/components/WikiPageWrapper";
import React from "react";
import {WikiStyles} from "./WikiStyles.stylex";

const styles = stylex.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  content: {
    marginLeft: WikiStyles.sidebarWidth,
    height: '100%',
    width: '100%',
  }
})

type Props = {
  wikiName: string;
  wikiId: string;
  wiki: WikiSidebar_wiki$key | null | undefined;
  children: React.ReactNode;
}

export default function WikiPageLayout({ wikiName, wikiId, wiki, children }: Props) {
  return (
    <WikiPageWrapper wikiName={wikiName}>
      <div {...stylex.props(styles.body)}>
        <WikiSidebar wikiId={wikiId} wiki={wiki}/>
        <div {...stylex.props(styles.content)}>
          {children}
        </div>
      </div>
    </WikiPageWrapper>
  );
}