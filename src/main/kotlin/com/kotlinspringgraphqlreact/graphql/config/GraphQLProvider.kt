package com.kotlinspringgraphqlreact.graphql.config

import com.expediagroup.graphql.SchemaGeneratorConfig
import com.expediagroup.graphql.TopLevelObject
import com.expediagroup.graphql.toSchema
import graphql.GraphQL
import graphql.schema.idl.SchemaPrinter
import org.springframework.stereotype.Component
import java.io.File

@Component
class GraphQLProvider(
  queries: List<GraphQLQuery>//,
  //private val mutations: List<GraphQLMutation>,
  //private val subscriptions: List<GraphQLSubscription>
) {
  val graphQL: GraphQL

  init {
    val config = SchemaGeneratorConfig(supportedPackages = listOf("com.kotlinspringgraphlreact.graphql"))
    val schema = toSchema(config, queries.map { TopLevelObject(it) }, listOf())
    val printer = SchemaPrinter(SchemaPrinter.Options.defaultOptions().includeDirectives(true))
    val file = File("src/main/resources/schema.graphqls")
    file.writeText(printer.print(schema))
    graphQL = GraphQL.newGraphQL(schema).build()
  }
}