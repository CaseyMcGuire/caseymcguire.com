import * as React from "react";
import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {MovieAppRouterQuery} from "../../__generated__/MovieAppRouterQuery.graphql";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
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
      <Switch>
        {
          getMovieAppRoutes().map(route =>
            <Route key={route.path}
                   exact
                   path={route.path}
                   render={(props) => {
                     return route.render(props)
                   }}
            />
          )
        }
      </Switch>
    </BrowserRouter>

  )
}