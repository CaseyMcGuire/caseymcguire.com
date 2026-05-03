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


@EnableWebSecurity
@EnableMethodSecurity
@Configuration
open class SecurityConfiguration(private val userDetailsService: UserDetailsServiceImpl){

  @Bean
  fun passwordEncoder(): PasswordEncoder {
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
  open fun filterChain(http: HttpSecurity): SecurityFilterChain {

    http {
      authorizeHttpRequests {
        authorize("/posts/new", hasRole("ADMIN"))
        authorize("/posts/*/edit", hasRole("ADMIN"))
        authorize("/graphiql/**", hasRole("ADMIN"))
        authorize("/workout_tracker/**", hasRole("ADMIN"))
        authorize("/**", permitAll)
      }
      formLogin {
        loginPage = "/login"
        defaultSuccessUrl("/", true)
        authenticationSuccessHandler = SavedRequestAwareAuthenticationSuccessHandler()
        // Match the LoginError union in LoginPage.tsx — keep these codes in sync.
        failureUrl = "/login?error=invalid_credentials"
        // note usernameParameter and password parameter aren't available yet but they will be at some point:
        // https://github.com/spring-projects/spring-security/issues/14474
      }
      logout {
        logoutSuccessUrl = "/"
      }
    }
    // Drop into the Java DSL because the Kotlin `csrf { ... }` block doesn't expose `spa()` yet.
    // `spa()` wires up the SPA-friendly setup: CookieCsrfTokenRepository.withHttpOnlyFalse(),
    // a hybrid request handler (XOR for rendered tokens to mitigate BREACH, plain for header
    // lookups so the JS frontend can echo the cookie back), and eager token loading so the
    // XSRF-TOKEN cookie is actually emitted on read-only requests.
    http.csrf { it.spa() }

    return http.build();
  }
}