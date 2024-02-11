package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.DgsConstants
import com.caseymcguiredotcom.codegen.graphql.types.Movie
import com.caseymcguiredotcom.codegen.graphql.types.MovieListType
import com.caseymcguiredotcom.services.movies.MovieService
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsData
import com.netflix.graphql.dgs.DgsQuery

@DgsComponent
class MovieDataFetcher(val movieService: MovieService) {

  // we need to create a dummy object here to hook up with the schema. Actual field retrieval is define below
  @DgsQuery
  fun movieApi(): MovieApi {
    return MovieApi()
  }

  @DgsData(parentType = DgsConstants.MOVIEAPI.TYPE_NAME, field = "movie")
  fun getMovie(id: String): Movie? {
    return movieService.getMovie(id)?.let {
      Movie(
        title = it.title,
        backdropPath = it.backdropPath
      )
    }
  }

  @DgsData(parentType = DgsConstants.MOVIEAPI.TYPE_NAME, field = "movieList")
  fun getMovieType(listType: MovieListType): List<Movie> {
    val movieList = movieService.getMovieList(listType) ?: return emptyList()
    return movieList.results.map {
      Movie(
        title = it.title,
        backdropPath = "https://image.tmdb.org/t/p/w500${it.backdropPath}"
      )
    }
  }
}

class MovieApi