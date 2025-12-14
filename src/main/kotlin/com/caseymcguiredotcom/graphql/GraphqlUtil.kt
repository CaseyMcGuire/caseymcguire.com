package com.caseymcguiredotcom.graphql

import java.util.Base64

fun toGlobalId(type: String, id: Int): String {
  return toGlobalId(type, id.toString())
}

fun toGlobalId(type: String, id: String): String {
  val input = "$type:$id"
  return Base64.getEncoder().encodeToString(input.toByteArray())
}

fun fromGlobalIdOrNull(globalId: String): String? {
  val decoded = String(Base64.getDecoder().decode(globalId))
  // Split "WikiPage:2" and take the second part
  return decoded.split(":").getOrNull(1)
}