package com.caseymcguiredotcom.views

import kotlinx.html.link

class AiChatPage : RenderablePage {

  override fun render(): String {
    return ReactPage("ai_chat", "AI Chat")
      .customHead {
        link {
          rel = "stylesheet"
          href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Noto+Sans:wght@400;700&display=swap"
        }
      }
      .render()
  }
}