// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.
// Run './gradlew generateClientRoutes' to regenerate.

function routeWithoutParams(path: string) {
  return Object.assign(() => path, { path });
}

export const MoviesRoutes = {
  MoviesIndex: routeWithoutParams("/movie_app/movies"),
  TelevisionIndex: routeWithoutParams("/movie_app/tv"),
} as const;

export type MoviesRoute = keyof typeof MoviesRoutes;
