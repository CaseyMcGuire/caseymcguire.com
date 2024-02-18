package models

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

data class UserDetailsImpl(
  val user: User
) : UserDetails {

  override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
    if (user.getRole() == null) {
      return mutableListOf()
    }
    return mutableListOf(SimpleGrantedAuthority("ROLE_${user.getRole()}"))
  }

  override fun isEnabled(): Boolean {
    return true
  }

  override fun getUsername(): String {
    return user.getEmail()
  }

  override fun isCredentialsNonExpired(): Boolean {
    return true
  }

  override fun getPassword(): String {
    return user.getPassWord()
  }

  override fun isAccountNonExpired(): Boolean {
    return true
  }

  override fun isAccountNonLocked(): Boolean {
    return true
  }
}