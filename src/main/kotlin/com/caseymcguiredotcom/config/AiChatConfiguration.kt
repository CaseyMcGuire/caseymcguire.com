package com.caseymcguiredotcom.config

import org.springframework.ai.anthropic.AnthropicChatModel
import org.springframework.ai.chat.client.ChatClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class AiChatConfiguration {

  @Bean
  open fun chatClient(anthropicChatModel: AnthropicChatModel): ChatClient {
    return ChatClient.builder(anthropicChatModel).build()
  }
}