// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.
// Run './gradlew generateClientRoutes' to regenerate.

export const WikiRoutes = {
  EDIT_WIKI_PAGE: "/wiki/:wikiName/:pageId/edit",
  NEW_WIKI_PAGE: "/wiki/new",
  WIKI_HOME: "/wiki",
  WIKI_INDEX: "/wiki/:wikiName",
  WIKI_PAGE: "/wiki/:wikiName/:pageId",
} as const;

export type WikiRoute = keyof typeof WikiRoutes;
