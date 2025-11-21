import * as React from "react";
import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {MovieAppRouterQuery} from "__generated__/relay/MovieAppRouterQuery.graphql";
import {BrowserRouter, Route, Routes} from "react-router";
import getMovieAppRoutes from "./MovieAppRoutes";

export default function MovieAppRouter() {
  const query = graphql`
    query MovieAppRouterQuery {
      movieApi {
        movie(id: "464052") {
          title
        }        
      }
    }
  `;

  const response = useLazyLoadQuery<MovieAppRouterQuery>(query, {})
  return (
    <BrowserRouter>
      <Routes>
        {
          getMovieAppRoutes().map(route =>
            <Route key={route.path}
                   path={route.path}
                   element={route.element}
            />
          )
        }
      </Routes>
    </BrowserRouter>

  )
}