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

export const CaseyMcGuireRoutes = {
  BlogIndex: routeWithoutParams("/"),
  EditPost: route(
    "/posts/:id/edit",
    (params: { id: number }) => `/posts/${encodeRouteParam(params.id)}/edit`
  ),
  InternalServerError: routeWithoutParams("/500"),
  Login: routeWithoutParams("/login"),
  NewPost: routeWithoutParams("/posts/new"),
  NftPreview: routeWithoutParams("/nft-preview"),
  NotFound: routeWithoutParams("/404"),
  PostsIndex: routeWithoutParams("/posts"),
  Projects: routeWithoutParams("/projects"),
  Register: routeWithoutParams("/register"),
  Resume: routeWithoutParams("/resume"),
  Tetris: routeWithoutParams("/tetris"),
  ViewPost: route(
    "/posts/:id",
    (params: { id: number }) => `/posts/${encodeRouteParam(params.id)}`
  ),
  ViewPostsPage: route(
    "/posts/page/:id",
    (params: { id: number }) => `/posts/page/${encodeRouteParam(params.id)}`
  ),
} as const;

export type CaseyMcGuireRoute = keyof typeof CaseyMcGuireRoutes;
