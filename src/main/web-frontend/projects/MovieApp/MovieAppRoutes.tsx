import {RouteComponentProps} from "react-router-dom";
import * as React from "react";
import MovieHomePage from "./MovieHomePage";
import MovieAppTvPage from "./MovieAppTvPage";

type MovieRoute = {
  path: string,
  render: (routeProps: RouteComponentProps<any>) => JSX.Element
}

export default function getMovieAppRoutes(): Array<MovieRoute> {
  return [
    {
      path: '/movies',
      render: (props) => <MovieHomePage />
    },
    {
      path: '/tv',
      render: (props) => <MovieAppTvPage />
    }
  ];
}