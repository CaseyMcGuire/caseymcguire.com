package com.caseymcguiredotcom.services.movies

import com.caseymcguiredotcom.codegen.graphql.types.MovieListType
import com.caseymcguiredotcom.graphql.models.Movie
import com.caseymcguiredotcom.graphql.models.MovieList
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.client.RestClient
import org.springframework.web.reactive.function.client.WebClient
import java.net.URI

@Component
class MovieService(
  private val tmdbApiKey: String,
  private val restClient: RestClient
) {

  companion object {
    const val BASE_URL = "https://api.themoviedb.org/3"
  }

  fun getMovie(id: String): Movie? {
    val path = "$BASE_URL/movie/${id}?api_key=${tmdbApiKey}"

    return restClient.get()
      .uri(URI(path))
      .accept(MediaType.APPLICATION_JSON)
      .retrieve()
      .body(Movie::class.java)
  }

  fun getMovieList(type: MovieListType): MovieList? {

    return restClient.get()
      .uri(URI("$BASE_URL/movie/${type.name.lowercase()}?api_key=${tmdbApiKey}"))
      .accept(MediaType.APPLICATION_JSON)
      .retrieve()
      .body(MovieList::class.java)
  }
}