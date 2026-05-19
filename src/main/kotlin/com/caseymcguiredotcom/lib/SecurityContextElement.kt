package com.caseymcguiredotcom.lib

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ThreadContextElement
import kotlinx.coroutines.withContext
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import kotlin.coroutines.AbstractCoroutineContextElement
import kotlin.coroutines.CoroutineContext

class SecurityContextElement(
  private val securityContext: SecurityContext = currentSecurityContextSnapshot(),
) : ThreadContextElement<SecurityContext?>,
  AbstractCoroutineContextElement(SecurityContextElement) {

  companion object Key : CoroutineContext.Key<SecurityContextElement>

  override fun updateThreadContext(context: CoroutineContext): SecurityContext? {
    val previousContext = SecurityContextHolder.getContext()
    SecurityContextHolder.setContext(securityContext)
    return previousContext.takeIf { it.authentication != null }
  }

  override fun restoreThreadContext(context: CoroutineContext, oldState: SecurityContext?) {
    if (oldState == null) {
      SecurityContextHolder.clearContext()
    } else {
      SecurityContextHolder.setContext(oldState)
    }
  }
}

suspend fun <T> withSecurityContextOnIo(block: suspend () -> T): T {
  val securityContext = currentSecurityContextSnapshot()
  return withContext(Dispatchers.IO + SecurityContextElement(securityContext)) {
    block()
  }
}

private fun currentSecurityContextSnapshot(): SecurityContext {
  val snapshot = SecurityContextHolder.createEmptyContext()
  snapshot.authentication = SecurityContextHolder.getContext().authentication
  return snapshot
}
