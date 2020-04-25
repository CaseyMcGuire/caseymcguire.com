package com.kotlinspringgraphqlreact.graphql.query

import com.kotlinspringgraphqlreact.graphql.config.GraphQLQuery
import org.springframework.stereotype.Component

@Component
class TestQuery : GraphQLQuery {
  fun foo() = "asdf"

  fun bar(baz: String) = baz
}