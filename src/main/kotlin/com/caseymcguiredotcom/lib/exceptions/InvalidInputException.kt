package com.caseymcguiredotcom.lib.exceptions

class InvalidInputException(
  val input: String
) : Exception(input)