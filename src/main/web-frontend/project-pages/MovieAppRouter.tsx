import * as React from "react";
import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {MovieAppRouterQuery} from "../__generated__/MovieAppRouterQuery.graphql";

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
    <div>
      {response?.movieApi?.movie?.title}
    </div>
  )
}