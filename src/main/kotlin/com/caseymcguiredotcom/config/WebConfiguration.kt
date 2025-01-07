package com.caseymcguiredotcom.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping
import routeannotatonprocessor.NamedRequestMappingHandlerMapping

@Configuration
open class WebConfiguration : WebMvcConfigurer {

  @Bean
  fun customRequestMappingHandlerMapping(): RequestMappingHandlerMapping {
    return NamedRequestMappingHandlerMapping().apply {
      order = 0
    }
  }
}