import * as React from "react";
import {graphql} from "react-relay";
import MovieRoot from "./MovieRoot";

export default function MovieHomePage() {

  /*const query = graphql`
    query MovieHomePage {
      movieApi {
        lists(listType: NOW_PLAYING) {
          title
          backdropPath
        }

      }
    }
  `*/

  return (
    <MovieRoot>
      <div>alskdjflasdf</div>
    </MovieRoot>
  )
}