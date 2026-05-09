package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.lib.exceptions.InvalidCursorException
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import tools.jackson.databind.ObjectMapper
import java.util.Base64

@Service
class CursorService(private val objectMapper: ObjectMapper) {
  private val log = LoggerFactory.getLogger(CursorService::class.java)

  fun encode(value: Any): String =
    Base64.getUrlEncoder().withoutPadding().encodeToString(objectMapper.writeValueAsBytes(value))

  fun <T : Any> decode(cursor: String, type: Class<T>): T =
    try {
      val bytes = Base64.getUrlDecoder().decode(cursor)
      objectMapper.readValue(bytes, type)
    } catch (e: Exception) {
      log.error("Decoding failed for $cursor and type $type", e)
      throw InvalidCursorException("Decoding failed for $cursor", e)
    }
}
