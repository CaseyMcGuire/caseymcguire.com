import * as React from "react";
import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {MovieAppRouterQuery} from "../__generated__/MovieAppRouterQuery.graphql";
import MovieRoot from "./MovieRoot";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";

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
        <Route key={"alsjdf"}
               exact
               path={"/movies"}
               render={(props) => {
                 return <MovieRoot>
                   <div>
                     {response?.movieApi?.movie?.title}
                   </div>
                 </MovieRoot>
               }}

               />
      </Switch>
    </BrowserRouter>

  )
}