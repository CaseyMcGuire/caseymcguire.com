package com.caseymcguiredotcom.config

import com.caseymcguiredotcom.lib.Time
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.codec.json.Jackson2JsonDecoder
import org.springframework.web.client.RestTemplate
import org.springframework.web.reactive.function.client.ExchangeStrategies
import org.springframework.web.reactive.function.client.WebClient

@Configuration
open class BeanProvider {

  @Bean
  open fun restTemplate(): RestTemplate {
    return RestTemplate()
  }

  @Bean
  open fun time(): Time {
    return Time()
  }

  @Bean
  open fun webClient(): WebClient {
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
    return WebClient
      .builder()
      .exchangeStrategies(executionStrategies)
      .build()
  }
}