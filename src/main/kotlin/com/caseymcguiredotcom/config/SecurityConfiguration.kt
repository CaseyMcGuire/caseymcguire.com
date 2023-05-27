package com.caseymcguiredotcom.config

import com.caseymcguiredotcom.services.UserDetailsServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.csrf.CookieCsrfTokenRepository


@EnableWebSecurity
open class SecurityConfiguration(val userDetailsService: UserDetailsServiceImpl){

  @Bean
  open fun passwordEncoder(): PasswordEncoder? {
    return BCryptPasswordEncoder()
  }

  @Bean
  open fun authenticationManager(http: HttpSecurity): AuthenticationManager {
    val authenticationManagerBuilder = http.getSharedObject(
      AuthenticationManagerBuilder::class.java
    )
    authenticationManagerBuilder.userDetailsService(userDetailsService)
      .passwordEncoder(passwordEncoder())
    return authenticationManagerBuilder.build()
  }

  @Bean
  open fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
    http
      .authorizeRequests()
        .antMatchers( "/posts/new").authenticated()
        .antMatchers("/graphiql").hasAuthority("ADMIN")
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
      .and()
      .csrf()
      // this makes it so that the CSRF token is sent in the cookie.
      // See https://www.baeldung.com/spring-security-csrf#2-front-end-configuration
      .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())

    return http.build()
  }
}