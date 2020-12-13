package com.caseymcguiredotcom.models

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class User(
  private val id: Int,
  private val email: String,
  private val password: String,
  private val role: String?
) : UserDetails {

  override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
    if (role == null) {
      return mutableListOf()
    }
    return mutableListOf(SimpleGrantedAuthority(role))
  }

  override fun isEnabled(): Boolean {
    return true
  }

  override fun getUsername(): String {
    return email
  }

  fun getId(): Int {
    return id
  }

  override fun isCredentialsNonExpired(): Boolean {
    return true
  }

  override fun getPassword(): String {
    return password
  }

  override fun isAccountNonExpired(): Boolean {
    return true
  }

  override fun isAccountNonLocked(): Boolean {
    return true
  }
}