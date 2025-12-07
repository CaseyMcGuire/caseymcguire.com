package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.types.CreateWikiPageResponse
import com.caseymcguiredotcom.codegen.graphql.types.CreateWikiResponse
import com.caseymcguiredotcom.codegen.graphql.types.FailedWikiResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulCreateWikiPageResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulCreateWikiResponse
import com.caseymcguiredotcom.codegen.graphql.types.Wiki
import com.caseymcguiredotcom.codegen.graphql.types.WikiErrorCode
import com.caseymcguiredotcom.db.models.wiki.toGraphqlType
import com.caseymcguiredotcom.lib.exceptions.InvalidInputException
import com.caseymcguiredotcom.lib.exceptions.PermissionDeniedException
import com.caseymcguiredotcom.lib.exceptions.UserNotLoggedInException
import com.caseymcguiredotcom.services.WikiService
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsMutation
import com.netflix.graphql.dgs.DgsQuery
import com.netflix.graphql.dgs.InputArgument

@DgsComponent
class WikiFetcher(
  private val wikiService: WikiService
) {

  @DgsQuery
  fun wikiByName(
    @InputArgument name: String
  ): Wiki? {
    return wikiService.getWikiByName(name)?.toGraphqlType()
  }

  @DgsMutation
  fun createWiki(
    @InputArgument name: String
  ): CreateWikiResponse {
    return try {
      SuccessfulCreateWikiResponse(
        wikiService.createWiki(name).toGraphqlType()
      )
    } catch(e: Exception) {
      return e.toWikiResponse()
    }
  }

  @DgsMutation
  fun createWikiPage(
    @InputArgument pageName: String,
    @InputArgument wikiId: String,
    @InputArgument folderId: String?
  ): CreateWikiPageResponse {
    return try {
      SuccessfulCreateWikiPageResponse(
        wikiService.createWikiPage(
          wikiId.toIntOrNull() ?:
            throw InvalidInputException("wikiId is not a valid ID"),
          pageName,
          if (folderId == null) {
            null
          } else {
            folderId.toIntOrNull()
              ?: throw InvalidInputException("folderId is not a valid ID")
          }
        ).toGraphqlType()
      )
    }
    catch (e: Exception) {
      e.toWikiResponse()
    }
  }

  private fun Exception.toWikiResponse(): FailedWikiResponse {
    return when (this) {
      is PermissionDeniedException ->
        FailedWikiResponse(
          WikiErrorCode.PERMISSION_DENIED,
          this.message ?: "Unknown error"
        )
      is UserNotLoggedInException ->
        FailedWikiResponse(
          WikiErrorCode.NOT_AUTHENTICATED,
          this.message ?: "Unknown error"
        )
      is InvalidInputException ->
        FailedWikiResponse(
          WikiErrorCode.VALIDATION_ERROR,
          this.message ?: "Unknown error"
        )
      else -> throw this
    }
  }
}
