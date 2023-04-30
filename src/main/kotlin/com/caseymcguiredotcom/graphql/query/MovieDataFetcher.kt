package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.types.Movie
import com.caseymcguiredotcom.services.movies.MovieService
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsQuery

@DgsComponent
class MovieDataFetcher(val movieService: MovieService) {

  @DgsQuery(field = "movie")
  fun getMovie(id: String): Movie? {
    return movieService.getMovie(id)?.let {
      Movie(
        title = it.title,
        backdropPath = it.backdropPath
      )
    }
  }
}