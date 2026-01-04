import * as React from "react";
import {graphql} from "react-relay";
import MovieRoot from "./MovieRoot";
import {useLazyLoadQuery} from "react-relay/hooks";
import {MovieHomePageQuery} from "__generated__/relay/MovieHomePageQuery.graphql";
import MovieAppBackdropImageScroll from "./MovieAppBackdropImageScroll";

export default function MovieHomePage() {

  const query = graphql`
    query MovieHomePageQuery {
      movieApi {
        movieList(listType: NOW_PLAYING) {
          title
          backdropPath
          ...MovieAppBackdropImageScroll_movie
        }
      }
    }
  `

  const response = useLazyLoadQuery<MovieHomePageQuery>(query, {})
  const movieList = response.movieApi?.movieList?.flatMap(f => f ? [f] : []) ?? []
  return (
    <MovieRoot>
      <div>
        {
          movieList.map(
            movie => {
              return <MovieAppBackdropImageScroll movie={movie}/>
            })
        }
      </div>
    </MovieRoot>
  )
}