// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.
// Run './gradlew generateClientRoutes' to regenerate.

export const WikiRoutes = {
  EditWikiPage: "/wiki/:wikiId/:pageId/edit",
  NewWikiPage: "/wiki/new",
  WikiHome: "/wiki",
  WikiIndex: "/wiki/:wikiId",
  WikiPage: "/wiki/:wikiId/:pageId",
} as const;

export type WikiRoute = keyof typeof WikiRoutes;
