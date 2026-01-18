package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.DgsConstants
import com.caseymcguiredotcom.codegen.graphql.types.CreateWikiFolderResponse
import com.caseymcguiredotcom.codegen.graphql.types.CreateWikiPageResponse
import com.caseymcguiredotcom.codegen.graphql.types.CreateWikiResponse
import com.caseymcguiredotcom.codegen.graphql.types.FailedWikiResponse
import com.caseymcguiredotcom.codegen.graphql.types.GqlWiki
import com.caseymcguiredotcom.codegen.graphql.types.GqlWikiFolder
import com.caseymcguiredotcom.codegen.graphql.types.GqlWikiNode
import com.caseymcguiredotcom.codegen.graphql.types.GqlWikiPage
import com.caseymcguiredotcom.codegen.graphql.types.MoveWikiItemResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulCreateWikiFolderResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulCreateWikiPageResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulCreateWikiResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulMoveWikiItemResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulUpdateWikiPageContentResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulUpdateWikiPageNameResponse
import com.caseymcguiredotcom.codegen.graphql.types.UpdateWikiPageOrFolderNameResponse
import com.caseymcguiredotcom.codegen.graphql.types.UpdateWikiPageResponse
import com.caseymcguiredotcom.codegen.graphql.types.WikiErrorCode
import com.caseymcguiredotcom.codegen.graphql.types.WikiItemType
import com.caseymcguiredotcom.db.models.wiki.WikiNodeType
import com.caseymcguiredotcom.db.models.wiki.toGqlWikiNode
import com.caseymcguiredotcom.db.models.wiki.toGraphqlType
import com.caseymcguiredotcom.graphql.GlobalId
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
import org.slf4j.LoggerFactory
import java.util.Base64.getDecoder
import java.util.concurrent.CompletableFuture

@DgsComponent
class WikiFetcher(
  private val wikiService: WikiService
) {

  private val log = LoggerFactory.getLogger(WikiFetcher::class.java)

  @DgsQuery
  fun wikiByName(
    @InputArgument name: String
  ): GqlWiki? {
    return wikiService.getWikiByName(name)?.toGraphqlType()
  }

  @DgsQuery
  fun wikiPageById(
    @InputArgument id: String?
  ): GqlWikiPage? {
    if (id == null) {
      return null
    }
    return wikiService.getWikiPageById(
      id.idToIntOrThrow("[wikiPageById] Invalid ID: $id")
    )?.toGraphqlType()

  }

  @DgsMutation
  fun createWiki(
    @InputArgument name: String
  ): CreateWikiResponse {
    return try {
      SuccessfulCreateWikiResponse(
        wikiService.createWiki(name).toGraphqlType()
      )
    } catch (e: Exception) {
      return e.toWikiResponse()
    }
  }

  @DgsMutation
  fun updateWikiPageContent(
    @InputArgument pageId: String,
    @InputArgument name: String,
    @InputArgument content: String
  ): UpdateWikiPageResponse {
    return try {
      return SuccessfulUpdateWikiPageContentResponse(
        wikiService.updateWikiPage(
          pageId.idToIntOrThrow("pageId $pageId is not a valid ID"),
          name,
          content
        ).toGraphqlType()
      )
    } catch (e: Exception) {
      log.error("Failed to update wiki page content", e)
      e.toWikiResponse()
    }
  }

  @DgsMutation
  fun updateWikiPageOrFolderName(
    @InputArgument id: String,
    @InputArgument name: String
  ): UpdateWikiPageOrFolderNameResponse {
    return try {
      val globalId = GlobalId.fromString(id)
      val node = when (globalId.type) {
        GqlWikiFolder::class.simpleName -> wikiService.updateWikiFolderName(
          globalId.id.toInt(),
          name
        ).toWikiNode()

        GqlWikiPage::class.simpleName -> wikiService.updateWikiPageName(
          globalId.id.toInt(),
          name
        ).toWikiNode()

        else -> throw IllegalArgumentException("Invalid ID: ${globalId}")
      }
      return SuccessfulUpdateWikiPageNameResponse(
        wikiNode = node.toGqlWikiNode(),
        wiki = wikiService.getWikiById(node.wikiId)?.toGraphqlType()
          ?: error(
            "Wiki not found for ID: ${globalId.id}"
          )
      )
    } catch (e: Exception) {
      log.error("Failed to update wiki page content", e)
      e.toWikiResponse()
    }
  }

  @DgsData(parentType = DgsConstants.GQLWIKIFOLDER.TYPE_NAME, field = DgsConstants.GQLWIKIFOLDER.Children)
  fun getWikiFolderChildren(dfe: DgsDataFetchingEnvironment): CompletableFuture<List<GqlWikiNode>> {
    val folder = dfe.getSource<GqlWikiFolder>()
    val dataLoader = dfe.getDataLoader<String, List<GqlWikiNode>>(FolderIdToChildrenDataLoader::class.java)
    return dataLoader.load(folder.id)
  }

  @DgsData(parentType = DgsConstants.GQLWIKI.TYPE_NAME, field = DgsConstants.GQLWIKI.RootFolder)
  fun getRootFolderChildren(dfe: DgsDataFetchingEnvironment): GqlWikiFolder? {
    val wiki = dfe.getSource<GqlWiki>()
    return wikiService.getRootFolderByWikiId(fromGlobalIdOrThrow(wiki.id))?.toGraphqlType()
  }

  @DgsMutation
  fun createWikiPage(
    @InputArgument pageName: String,
    @InputArgument wikiId: String,
    @InputArgument folderId: String?
  ): CreateWikiPageResponse {
    return try {
      val internalWikiId = wikiId.idToIntOrThrow("wikiId $wikiId is not a valid ID")
      SuccessfulCreateWikiPageResponse(
        wikiPage = wikiService.createWikiPage(
          internalWikiId,
          pageName,
          folderId?.idToIntOrThrow("folderId $folderId is not a valid ID")
        ).toGraphqlType(),
        wiki = wikiService.getWikiById(internalWikiId)?.toGraphqlType()
          ?: error("Wiki not found")
      )
    } catch (e: Exception) {
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
      val internalWikiId = wikiId.idToIntOrThrow("wikiId $wikiId is not a valid ID")
      SuccessfulCreateWikiFolderResponse(
        wikiFolder = wikiService.createWikiFolder(
          internalWikiId,
          folderName,
          folderId?.let {
            it.toIntOrNull() ?: throw InvalidInputException("folderId $it is not a valid ID")
          }
        ).toGraphqlType(),
        wiki = wikiService.getWikiById(internalWikiId)?.toGraphqlType()
          ?: error("Wiki not found")
      )
    } catch (e: Exception) {
      e.toWikiResponse()
    }
  }

  @DgsMutation
  fun moveWikiItem(
    @InputArgument wikiId: String,
    @InputArgument itemId: String,
    @InputArgument destinationParentFolderId: String,
    @InputArgument beforeSiblingId: String?,
    @InputArgument afterSiblingId: String?
  ): MoveWikiItemResponse {
    return try {
      val globalId = WikiGlobalId.fromString(itemId)
      val wikiIntId = wikiId.idToIntOrThrow("wikiId $wikiId is not a valid ID")
      val itemIntId = itemId.idToIntOrThrow("pageId $itemId is not a valid ID")
      val destinationIntParentFolderId = destinationParentFolderId.idToIntOrThrow("folderId $destinationParentFolderId is not a valid ID")
      val globalBeforeSiblingId = beforeSiblingId?.let { WikiGlobalId.fromString(it) }
      val globalAfterSiblingId = afterSiblingId?.let { WikiGlobalId.fromString(it) }
      when (globalId.type) {
        WikiNodeType.PAGE -> {
          wikiService.movePage(
            wikiIntId,
            itemIntId,
            destinationIntParentFolderId,
            globalBeforeSiblingId,
            globalAfterSiblingId
          )
        }
        WikiNodeType.FOLDER -> {
          wikiService.moveFolder(
            wikiIntId,
            itemIntId,
            destinationIntParentFolderId,
            globalBeforeSiblingId,
            globalAfterSiblingId
          )
        }
      }

      SuccessfulMoveWikiItemResponse(
        wikiService.getWikiById(wikiIntId)?.toGraphqlType(),
      )
    } catch (e: Exception) {
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

data class WikiGlobalId(val type: WikiNodeType, val id: Int) {
  companion object {
    fun fromString(str: String): WikiGlobalId {
      val globalId = GlobalId.fromString(str)
      return when (globalId.type) {
        GqlWikiFolder::class.simpleName -> WikiGlobalId(WikiNodeType.FOLDER, globalId.id.toInt())
        GqlWikiPage::class.simpleName -> WikiGlobalId(WikiNodeType.PAGE, globalId.id.toInt())
        else -> throw IllegalArgumentException("Invalid Global ID: $str")
      }
    }
  }
}
