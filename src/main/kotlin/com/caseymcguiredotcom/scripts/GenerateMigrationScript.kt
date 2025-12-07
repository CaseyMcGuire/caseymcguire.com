package com.caseymcguiredotcom.scripts

import com.github.vertical_blank.sqlformatter.SqlFormatter
import com.github.vertical_blank.sqlformatter.core.FormatConfig
import com.github.vertical_blank.sqlformatter.languages.Dialect
import io.github.classgraph.ClassGraph
import org.jetbrains.exposed.v1.core.ExperimentalDatabaseMigrationApi
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.jdbc.Database
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.migration.jdbc.MigrationUtils

@OptIn(ExperimentalDatabaseMigrationApi::class)
fun generateSingleScript() {
  Database.connect(
    url = env("DB_URL"),
    driver = "org.postgresql.Driver",
    user = env("DB_USER"),
    password = env("DB_PASSWORD")
  )

  val tableObjects: Array<Table> = ClassGraph()
    .enableAllInfo()
    .acceptPackages("com.caseymcguiredotcom.db.tables")
    .scan().use { scanResult ->
      scanResult
        .getSubclasses(Table::class.java.name)
        .loadClasses(Table::class.java)
        .mapNotNull { it.kotlin.objectInstance }
        .sortedBy { it.tableName }
        .toTypedArray()
    }

  val statements = transaction {
    MigrationUtils.statementsRequiredForDatabaseMigration(*tableObjects)
  }

  if (statements.isEmpty()) {
    println("No migration statements found")
    return
  }

  val formatConfig = FormatConfig.builder()
    .maxColumnLength(25)
    .linesBetweenQueries(2)
    .build()

  println("Database migration statements: ")
  println()
  statements.map {
    SqlFormatter
      .of(Dialect.PostgreSql)
      .format(it, formatConfig)
  }
    .forEach {
      println(it)
      println()
    }
}

private fun env(name: String): String =
  System.getenv(name) ?: error("$name is not set")

fun main(args: Array<String>) {
  generateSingleScript()
}