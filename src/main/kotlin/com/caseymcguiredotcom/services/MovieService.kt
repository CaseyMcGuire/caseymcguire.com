package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.graphql.models.GraphQLMovie
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

  fun getMovie(id: String): GraphQLMovie? {
    val path = "${BASE_URL}/movie/${id}?api_key=${tmdbApiKey}"
    return restTemplate.getForEntity<GraphQLMovie>(path).body
  }
}