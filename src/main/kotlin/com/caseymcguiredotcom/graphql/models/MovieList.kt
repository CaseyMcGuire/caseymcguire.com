package com.caseymcguiredotcom.graphql.models

import com.fasterxml.jackson.annotation.JsonProperty


data class MovieList(
  val page: Int,
  val results: List<Movie>,

  @JsonProperty("total_pages")
  val totalPages: Int,

  @JsonProperty("total_results")
  val totalResults: Int
)