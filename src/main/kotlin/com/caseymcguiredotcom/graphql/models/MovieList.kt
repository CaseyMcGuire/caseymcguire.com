package com.caseymcguiredotcom.graphql.models


data class MovieList(
  val dates: Dates,
  val page: Int,
  val results: List<Movie>,
  val totalPages: Int,
  val totalResults: Int
  )

data class Dates(val maximum: String?, val minimum: String?)