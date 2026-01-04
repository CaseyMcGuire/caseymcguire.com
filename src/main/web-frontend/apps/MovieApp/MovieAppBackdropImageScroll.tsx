import {useFragment} from "react-relay/hooks";
import {graphql} from "react-relay";
import {
  MovieAppBackdropImageScroll_movie$data,
  MovieAppBackdropImageScroll_movie$key
} from "__generated__/relay/MovieAppBackdropImageScroll_movie.graphql";
import * as React from "react";

type Props = {
  movie: MovieAppBackdropImageScroll_movie$key
}

export default function MovieAppBackdropImageScroll(
  props: Props
) {
  const data = useFragment(
    graphql`
      fragment MovieAppBackdropImageScroll_movie on Movie {
        title
        backdropPath
      }
    `,
      props.movie
  )

  const img = data.backdropPath
  if (img == null) {
    return null
  }

    return (
      <div>
        <img src={img}/>
      </div>
    )
}