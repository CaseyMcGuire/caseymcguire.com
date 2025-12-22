package com.caseymcguiredotcom.graphql

import java.util.Base64
import kotlin.reflect.KClass

fun toGlobalId(type: String, id: Int): String {
  return toGlobalId(type, id.toString())
}

fun toGlobalId(type: String, id: String): String {
  val input = "$type:$id"
  return Base64.getEncoder().encodeToString(input.toByteArray())
}

fun toGlobalId(type: KClass<*>, id: Int): String {
  val typeName = type.simpleName ?:
    error("Cannot create Global ID for anonymous class")
  return toGlobalId(typeName, id.toString())
}

fun toGlobalId(type: KClass<*>, id: String): String {
  val typeName = type.simpleName ?:
    error("Cannot create Global ID for anonymous class")
  return toGlobalId(typeName, id)
}

fun fromGlobalIdOrNull(globalId: String): String? {
  val decoded = String(Base64.getDecoder().decode(globalId))
  // Split "WikiPage:2" and take the second part
  return decoded.split(":").getOrNull(1)
}

fun fromGlobalIdOrThrow(globalId: String): Int {
  return fromGlobalIdOrNull(globalId)?.toIntOrNull()
    ?: error("Attempting to convert invalid global ID: $globalId")
}