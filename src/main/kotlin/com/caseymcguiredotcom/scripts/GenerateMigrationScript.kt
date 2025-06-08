package com.caseymcguiredotcom.scripts

import com.caseymcguiredotcom.db.tables.ExercisesTable
import com.caseymcguiredotcom.db.tables.PostsTable
import com.caseymcguiredotcom.db.tables.UsersTable
import com.caseymcguiredotcom.db.tables.WorkoutSetsTable
import com.caseymcguiredotcom.db.tables.WorkoutsTable
import org.jetbrains.exposed.v1.core.ExperimentalDatabaseMigrationApi
import org.jetbrains.exposed.v1.jdbc.Database
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.migration.MigrationUtils

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

  val statements = transaction {
    MigrationUtils.statementsRequiredForDatabaseMigration(
      UsersTable,
      PostsTable,
      WorkoutsTable,
      WorkoutSetsTable,
      ExercisesTable
    )
  }

  println("Database migration statements: ")
  statements.forEach {
    println(it)
  }
}

fun main(args: Array<String>) {
  generateSingleScript()
}