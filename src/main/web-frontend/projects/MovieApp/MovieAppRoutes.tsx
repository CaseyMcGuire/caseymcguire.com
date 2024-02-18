import * as React from "react";
import MovieHomePage from "./MovieHomePage";
import MovieAppTvPage from "./MovieAppTvPage";

type MovieRoute = {
  path: string,
  element: React.JSX.Element
}

export default function getMovieAppRoutes(): Array<MovieRoute> {
  return [
    {
      path: '/movies',
      element: <MovieHomePage />
    },
    {
      path: '/tv',
      element: <MovieAppTvPage />
    }
  ];
}