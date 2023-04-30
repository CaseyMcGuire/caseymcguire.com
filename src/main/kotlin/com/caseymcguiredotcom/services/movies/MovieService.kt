package com.caseymcguiredotcom.services.movies

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.http.MediaType
import org.springframework.http.codec.json.Jackson2JsonDecoder
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.ExchangeStrategies
import org.springframework.web.reactive.function.client.WebClient
import java.net.URI

@Component
class MovieService(
  private val tmdbApiKey: String
) {

  companion object {
    const val BASE_URL = "https://api.themoviedb.org/3"
  }

  fun getMovie(id: String): Movie? {
    val path = "$BASE_URL/movie/${id}?api_key=${tmdbApiKey}"
    val executionStrategies = ExchangeStrategies.builder()
      .codecs {
        it.defaultCodecs().jackson2JsonDecoder(
          Jackson2JsonDecoder(
            ObjectMapper().setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
              .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
              .registerModule(KotlinModule.Builder().build())
          )
        )
      }.build()
    val client = WebClient
      .builder()
      .exchangeStrategies(executionStrategies)
      .build()

    return client.get()
      .uri(URI(path))
      .accept(MediaType.APPLICATION_JSON)
      .retrieve()
      .bodyToMono(Movie::class.java)
      .block()
  }
}

data class Movie(
  val title: String?,
  val backdropPath: String?
)