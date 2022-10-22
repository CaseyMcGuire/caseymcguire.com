package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.codegen.graphql.types.Movie
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForEntity

@Component
class MovieService(
  private val restTemplate: RestTemplate,
  private val tmdbApiKey: String
) {

  companion object {
    const val BASE_URL = "https://api.themoviedb.org/3"
  }

  fun getMovie(id: String): Movie? {
    val path = "${BASE_URL}/movie/${id}?api_key=${tmdbApiKey}"
    return restTemplate.getForEntity<Movie>(path).body
  }
}