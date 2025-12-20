package com.caseymcguiredotcom.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.security.concurrent.DelegatingSecurityContextExecutor
import java.util.concurrent.Executor
import java.util.concurrent.ThreadPoolExecutor

@Configuration
class DataLoaderConfig {
  companion object {
    const val DATA_LOADER_EXECUTOR = "dataLoaderExecutor"
  }

  @Bean(DATA_LOADER_EXECUTOR)
  fun dataLoaderExecutor(): Executor {
    val delegate = ThreadPoolTaskExecutor().apply {
      corePoolSize = 16
      maxPoolSize = 64
      threadNamePrefix = "dataloader-"
      initialize()
    }
    return DelegatingSecurityContextExecutor(delegate)
  }
}