package com.caseymcguiredotcom.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class EnvironmentVariableConfiguration {

  @Value("\${tmdb_api_key:}")
  lateinit var tmbdApiKey: String

  @Bean
  open fun tmdbApiKey(): String {
    return tmbdApiKey
  }
}