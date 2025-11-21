package com.caseymcguiredotcom.routes

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.*

@Configuration
class RoutesHandler {

  @Bean
  fun routes(
    routeConfigs: List<SinglePageApplicationConfig>
  ): RouterFunction<ServerResponse> {
    return router {
      routeConfigs.forEach { config ->
        config.getFullUrls().forEach {
          GET(it, config.requestHandler::handle)
        }
      }
    }
  }
}