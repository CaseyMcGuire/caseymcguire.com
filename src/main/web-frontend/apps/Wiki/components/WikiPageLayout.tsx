import WikiSidebar from "apps/Wiki/components/WikiSidebar";
import {WikiSidebarFragment_wiki$key} from "__generated__/relay/WikiSidebarFragment_wiki.graphql";
import * as stylex from "@stylexjs/stylex";
import WikiPageWrapper from "apps/Wiki/components/WikiPageWrapper";
import React, {useState} from "react";
import {WikiStyles} from "apps/Wiki/components/WikiStyles.stylex";

const styles = stylex.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  content: {
    marginLeft: {
      default: WikiStyles.sidebarWidth,
      '@media (max-width: 600px)': 0
    },
    minWidth: 0,
    height: '100%',
    width: {
      default: `calc(100% - ${WikiStyles.sidebarWidth})`,
      '@media (max-width: 600px)': '100%'
    },
  }
})

type Props = {
  wikiName: string;
  wikiId: string;
  wiki: WikiSidebarFragment_wiki$key | null | undefined;
  currentPageId?: string;
  children: React.ReactNode;
}

export default function WikiPageLayout({ wikiName, wikiId, wiki, currentPageId, children }: Props) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <WikiPageWrapper
      wikiName={wikiName}
      onMenuButtonClick={() => setMobileSidebarOpen(true)}
    >
      <div {...stylex.props(styles.body)}>
        <WikiSidebar
          wikiId={wikiId}
          wiki={wiki}
          currentPageId={currentPageId}
          mobileOpen={mobileSidebarOpen}
          onRequestClose={() => setMobileSidebarOpen(false)}
        />
        <div {...stylex.props(styles.content)}>
          {children}
        </div>
      </div>
    </WikiPageWrapper>
  );
}
