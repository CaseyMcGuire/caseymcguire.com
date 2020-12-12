package com.caseymcguiredotcom.config

import com.caseymcguiredotcom.services.UserDetailsServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@EnableWebSecurity
open class SecurityConfiguration(val userDetailsService: UserDetailsServiceImpl) : WebSecurityConfigurerAdapter() {

  @Bean
  open fun passwordEncoder(): PasswordEncoder? {
    return BCryptPasswordEncoder()
  }

  override fun configure(auth: AuthenticationManagerBuilder) {
    auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder())
  }

  override fun configure(http: HttpSecurity) {
    http
      .authorizeRequests()
        .antMatchers( "/resume").permitAll()
      .and()
        .formLogin()
        .loginPage("/login")
        .usernameParameter("Email")
        .passwordParameter("Password")
        .defaultSuccessUrl("/")
        .failureUrl("/login?error=true")
      .and()
        .logout()
        .logoutSuccessUrl("/")

  }
}