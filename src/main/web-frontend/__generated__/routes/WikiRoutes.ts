// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.
// Run './gradlew generateClientRoutes' to regenerate.

function routeWithoutParams(path: string) {
  return Object.assign(() => path, { path });
}

type RouteParamValue = string | number;

function encodeRouteParam(value: RouteParamValue): string {
  return encodeURIComponent(String(value));
}

function route<TParams extends object>(path: string, buildPath: (params: TParams) => string) {
  return Object.assign(buildPath, { path });
}

export const WikiRoutes = {
  EditWikiPage: route(
    "/wiki/:wikiId/:pageId/edit",
    (params: { wikiId: string; pageId: string }) => `/wiki/${encodeRouteParam(params.wikiId)}/${encodeRouteParam(params.pageId)}/edit`
  ),
  NewWikiPage: routeWithoutParams("/wiki/new"),
  WikiHome: routeWithoutParams("/wiki"),
  WikiIndex: route(
    "/wiki/:wikiId",
    (params: { wikiId: string }) => `/wiki/${encodeRouteParam(params.wikiId)}`
  ),
  WikiPage: route(
    "/wiki/:wikiId/:pageId",
    (params: { wikiId: string; pageId: string }) => `/wiki/${encodeRouteParam(params.wikiId)}/${encodeRouteParam(params.pageId)}`
  ),
} as const;

export type WikiRoute = keyof typeof WikiRoutes;
