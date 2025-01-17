package com.caseymcguiredotcom.config

import com.caseymcguiredotcom.services.UserDetailsServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler


@EnableWebSecurity
@EnableMethodSecurity
@Configuration
class SecurityConfiguration(private val userDetailsService: UserDetailsServiceImpl){

  @Bean
  fun passwordEncoder(): PasswordEncoder? {
    return BCryptPasswordEncoder()
  }

  @Bean
  fun authenticationManager(http: HttpSecurity): AuthenticationManager {
    val authenticationManagerBuilder = http.getSharedObject(
      AuthenticationManagerBuilder::class.java
    )
    authenticationManagerBuilder.userDetailsService(userDetailsService)
      .passwordEncoder(passwordEncoder())
    return authenticationManagerBuilder.build()
  }

  @Bean
  fun filterChain(http: HttpSecurity): SecurityFilterChain {

    // Spring Security 6 introduced new behavior around CSRF tokens. This was preventing
    // me from logging in so I added the below code to opt out of the new default. It might
    // be worth revisiting at some point because I didn't spend the time to figure out how to
    // make it work
    // https://docs.spring.io/spring-security/reference/5.8/migration/servlet/exploits.html#_i_need_to_opt_out_of_deferred_tokens_for_another_reason
    val requestHandler = CsrfTokenRequestAttributeHandler()
    requestHandler.setCsrfRequestAttributeName(null)
    http {
      authorizeRequests {
        authorize("/posts/new", hasRole("ADMIN"))
        authorize("/posts/*/edit", hasRole("ADMIN"))
        authorize("/graphiql/**", hasRole("ADMIN"))
        //authorize("/workout_tracker/**", hasRole("ADMIN"))
        authorize("/**", permitAll)
      }
      formLogin {
        loginPage = "/login"
        defaultSuccessUrl("/", true)
        authenticationSuccessHandler = SavedRequestAwareAuthenticationSuccessHandler()
        failureUrl = "/login?error=true"
        // note usernameParameter and password parameter aren't available yet but they will be at some point:
        // https://github.com/spring-projects/spring-security/issues/14474
      }
      csrf {
        csrfTokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse()
        csrfTokenRequestHandler = requestHandler
      }
      logout {
        logoutSuccessUrl = "/"
      }
    }

    return http.build();
  }
}