import * as React from "react";
import MovieHomePage from "./MovieHomePage";
import MovieAppTvPage from "./MovieAppTvPage";
import {MoviesRoutes} from "__generated__/routes/MoviesRoutes";

type MovieRoute = {
  path: string,
  element: React.JSX.Element
}

export default function getMovieAppRoutes(): Array<MovieRoute> {
  return [
    {
      path: MoviesRoutes.MOVIES_INDEX,
      element: <MovieHomePage />
    },
    {
      path: MoviesRoutes.TELEVISION_INDEX,
      element: <MovieAppTvPage />
    }
  ];
}