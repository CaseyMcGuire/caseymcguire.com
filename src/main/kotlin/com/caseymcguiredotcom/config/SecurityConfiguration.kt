package com.caseymcguiredotcom.config

import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter

@EnableWebSecurity
open class SecurityConfiguration : WebSecurityConfigurerAdapter() {

  override fun configure(http: HttpSecurity) {
    //http.authorizeRequests().antMatchers( "/resume").permitAll()
  }
}