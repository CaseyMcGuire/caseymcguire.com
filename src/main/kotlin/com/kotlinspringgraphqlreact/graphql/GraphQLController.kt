package com.kotlinspringgraphqlreact.graphql

import com.kotlinspringgraphqlreact.graphql.config.GraphQLProvider
import graphql.ExecutionInput
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController


@RestController
class GraphQLController(
  private val graphQLBuilderProvider: GraphQLProvider
) {

  @PostMapping("/graphql")
  @ResponseBody
  fun graphql(@RequestBody request: GraphQLRequest): Map<String, Any> {
    val executionResult = graphQLBuilderProvider.graphQL
      .execute(ExecutionInput.newExecutionInput()
        .query(request.query)
        .operationName(request.operationName)
        .variables(request.variables ?: emptyMap())
        .build()
      )
    return executionResult.toSpecification()
  }

}

data class GraphQLRequest(val query: String?, val operationName: String?, val variables: Map<String, Any>?)