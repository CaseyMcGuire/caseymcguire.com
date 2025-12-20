package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.DgsConstants
import com.caseymcguiredotcom.codegen.graphql.types.CreateWikiFolderResponse
import com.caseymcguiredotcom.codegen.graphql.types.CreateWikiPageResponse
import com.caseymcguiredotcom.codegen.graphql.types.CreateWikiResponse
import com.caseymcguiredotcom.codegen.graphql.types.FailedWikiResponse
import com.caseymcguiredotcom.codegen.graphql.types.MoveWikiItemResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulCreateWikiFolderResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulCreateWikiPageResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulCreateWikiResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulMoveWikiItemResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulUpdateWikiPageContentResponse
import com.caseymcguiredotcom.codegen.graphql.types.UpdateWikiPageResponse
import com.caseymcguiredotcom.codegen.graphql.types.Wiki
import com.caseymcguiredotcom.codegen.graphql.types.WikiErrorCode
import com.caseymcguiredotcom.codegen.graphql.types.WikiFolder
import com.caseymcguiredotcom.codegen.graphql.types.WikiItemType
import com.caseymcguiredotcom.codegen.graphql.types.WikiSidebarMenuItem
import com.caseymcguiredotcom.db.models.wiki.toGraphqlType
import com.caseymcguiredotcom.db.models.wiki.toWikiSidebarMenuItem
import com.caseymcguiredotcom.graphql.dataloaders.FolderIdToChildrenDataLoader
import com.caseymcguiredotcom.graphql.fromGlobalIdOrNull
import com.caseymcguiredotcom.graphql.fromGlobalIdOrThrow
import com.caseymcguiredotcom.lib.exceptions.InvalidInputException
import com.caseymcguiredotcom.lib.exceptions.PermissionDeniedException
import com.caseymcguiredotcom.lib.exceptions.UserNotLoggedInException
import com.caseymcguiredotcom.services.WikiService
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsData
import com.netflix.graphql.dgs.DgsDataFetchingEnvironment
import com.netflix.graphql.dgs.DgsMutation
import com.netflix.graphql.dgs.DgsQuery
import com.netflix.graphql.dgs.InputArgument
import java.util.concurrent.CompletableFuture

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
  fun updateWikiPageContent(
    @InputArgument pageId: String,
    @InputArgument content: String
  ): UpdateWikiPageResponse {
    return try {
      return SuccessfulUpdateWikiPageContentResponse(
        wikiService.updateWikiPage(
          pageId.idToIntOrThrow("pageId $pageId is not a valid ID"),
          content
        ).toGraphqlType()
      )
    } catch (e: Exception) {
      e.toWikiResponse()
    }
  }

  @DgsData(parentType = DgsConstants.WIKIFOLDER.TYPE_NAME, field = DgsConstants.WIKIFOLDER.Children)
  fun getWikiFolderChildren(dfe: DgsDataFetchingEnvironment): CompletableFuture<List<WikiSidebarMenuItem>> {
    val folder = dfe.getSource<WikiFolder>()
    val dataLoader = dfe.getDataLoader<String, List<WikiSidebarMenuItem>>(FolderIdToChildrenDataLoader::class.java)
    return dataLoader.load(folder.id)
  }

  @DgsData(parentType = DgsConstants.WIKI.TYPE_NAME, field = DgsConstants.WIKI.Sidebar)
  fun getRootFolderChildren(dfe: DgsDataFetchingEnvironment): List<WikiSidebarMenuItem> {
    val wiki = dfe.getSource<Wiki>()
    return wikiService.getChildrenOfRootFolder(fromGlobalIdOrThrow(wiki.id))
      .map { it.toWikiSidebarMenuItem() }
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
            throw InvalidInputException("wikiId $wikiId is not a valid ID"),
          pageName,
          folderId?.let {
            it.toIntOrNull() ?:
            throw InvalidInputException("folderId $it is not a valid ID")
          }
        ).toGraphqlType()
      )
    }
    catch (e: Exception) {
      e.toWikiResponse()
    }
  }

  @DgsMutation
  fun createWikiFolder(
    @InputArgument folderName: String,
    @InputArgument wikiId: String,
    @InputArgument folderId: String?
  ): CreateWikiFolderResponse {
    return try {
      SuccessfulCreateWikiFolderResponse(
        wikiService.createWikiFolder(
          wikiId.toIntOrNull() ?:
            throw InvalidInputException("wikiId $wikiId is not a valid ID"),
          folderName,
          folderId?.let {
            it.toIntOrNull() ?:
              throw InvalidInputException("folderId $it is not a valid ID")
          }
        ).toGraphqlType()
      )
    }
    catch (e: Exception) {
      e.toWikiResponse()
    }
  }

  @DgsMutation
  fun moveWikiItem(
    @InputArgument wikiId: String,
    @InputArgument itemId: String,
    @InputArgument itemType: WikiItemType,
    @InputArgument destinationParentFolderId: String,
    @InputArgument beforeSiblingId: String?,
    @InputArgument afterSiblingId: String?
  ): MoveWikiItemResponse {
    return try {
      when (itemType) {
        WikiItemType.PAGE -> {
          wikiService.movePage(
            wikiId.idToIntOrThrow("wikiId $wikiId is not a valid ID"),
            itemId.idToIntOrThrow("pageId $itemId is not a valid ID"),
            destinationParentFolderId.idToIntOrThrow("folderId $destinationParentFolderId is not a valid ID"),
            beforeSiblingId?.idToIntOrThrow("beforeSiblingId $beforeSiblingId is not a valid ID"),
            afterSiblingId?.idToIntOrThrow("afterSiblingId $afterSiblingId is not a valid ID"),
            )
        }
        WikiItemType.FOLDER -> {
          wikiService.moveFolder(
            wikiId.idToIntOrThrow("wikiId $wikiId is not a valid ID"),
            itemId.idToIntOrThrow("pageId $itemId is not a valid ID"),
            destinationParentFolderId.idToIntOrThrow("folderId $destinationParentFolderId is not a valid ID"),
            beforeSiblingId?.idToIntOrThrow("beforeSiblingId $beforeSiblingId is not a valid ID"),
            afterSiblingId?.idToIntOrThrow("afterSiblingId $afterSiblingId is not a valid ID"),
          )
        }
      }

      SuccessfulMoveWikiItemResponse(
        wikiService.getWikiById(wikiId.toInt())?.toGraphqlType(),
      )
    }
    catch (e: Exception) {
      e.toWikiResponse()
    }
  }

  fun String.idToIntOrThrow(msg: String): Int {
    return fromGlobalIdOrNull(this)?.toIntOrNull() ?: throw InvalidInputException(msg)
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
