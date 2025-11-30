package com.caseymcguiredotcom.scripts

import io.github.classgraph.ClassGraph
import org.jetbrains.exposed.v1.core.ExperimentalDatabaseMigrationApi
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.jdbc.Database
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.migration.jdbc.MigrationUtils

@OptIn(ExperimentalDatabaseMigrationApi::class)
fun generateSingleScript() {
  val databaseUrl= System.getenv("DB_URL") ?:
    throw Exception("DB_URL is not set")
  val databaseUser = System.getenv("DB_USER") ?:
    throw Exception("DB_USER is not set")
  val databasePassword = System.getenv("DB_PASSWORD") ?:
    throw Exception("DB_PASSWORD is not set")

  Database.connect(
    url = databaseUrl,
    driver = "org.postgresql.Driver",
    user = databaseUser,
    password = databasePassword
  )

  val tableObjects = ClassGraph()
    .enableAllInfo()
    .acceptPackages("com.caseymcguiredotcom.db.tables")
    .scan()
    .getSubclasses(Table::class.java.name)
    .loadClasses(Table::class.java)
    .mapNotNull { it.kotlin.objectInstance }
    .toTypedArray()

  val statements = transaction {
    MigrationUtils.statementsRequiredForDatabaseMigration(*tableObjects)
  }

  println("Database migration statements: ")
  statements.forEach {
    println(it)
  }
}

fun main(args: Array<String>) {
  generateSingleScript()
}