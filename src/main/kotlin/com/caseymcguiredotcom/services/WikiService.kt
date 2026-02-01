package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.db.models.wiki.Wiki
import com.caseymcguiredotcom.db.models.wiki.WikiFolder
import com.caseymcguiredotcom.db.models.wiki.WikiNode
import com.caseymcguiredotcom.db.models.wiki.WikiPage
import com.caseymcguiredotcom.graphql.query.WikiGlobalId
import com.caseymcguiredotcom.lib.exceptions.DuplicateEntityException
import com.caseymcguiredotcom.lib.exceptions.PermissionDeniedException
import com.caseymcguiredotcom.lib.exceptions.UserNotLoggedInException
import com.caseymcguiredotcom.repositories.wiki.WikiRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Service
class WikiService(
  private val wikiRepository: WikiRepository,
  private val userService: UserService
) {
  @Transactional(readOnly = true)
  fun getWikiByName(name: String): Wiki? {
    return wikiRepository.getWikiByName(name)
  }

  @Transactional(readOnly = true)
  fun getWikiById(id: Int): Wiki? {
    return wikiRepository.getWikiById(id)
  }

  @Transactional
  fun updateWikiPage(
    pageId: Int,
    name: String,
    content: String
  ): WikiPage {
    checkUserHasPermission()
    return wikiRepository.updateWikiPageContent(pageId, name, content)
  }

  @Transactional
  fun updateWikiPageName(
    pageId: Int,
    name: String
  ): WikiPage {
    checkUserHasPermission()
    return wikiRepository.updateWikiPageName(pageId, name)
  }

  @Transactional
  fun updateWikiFolderName(
    folderId: Int,
    name: String
  ): WikiFolder {
    checkUserHasPermission()
    return wikiRepository.updateWikiFolderName(folderId, name)
  }

  @Transactional
  fun createWiki(name: String): Wiki {
    checkUserHasPermission()
    val existingWiki = wikiRepository.getWikiByName(name)
    if (existingWiki != null) {
      throw DuplicateEntityException("Wiki with name \"$name\" already exists")
    }
    val wiki = wikiRepository.createWiki(name)
    val uuid = UUID.randomUUID().toString()
    wikiRepository.createRootFolder(uuid, wiki.id)
    return wiki
  }

  @Transactional
  fun createWikiFolder(wikiId: Int, folderName: String, parentFolderId: Int?): WikiFolder {
    checkUserHasPermission()
    return wikiRepository.createWikiFolder(wikiId, folderName, resolveFolderId(wikiId, parentFolderId))
  }

  @Transactional
  fun createWikiPage(wikiId: Int, pageName: String, parentFolderId: Int?): WikiPage {
    checkUserHasPermission()
    return wikiRepository.createWikiPage(wikiId, pageName, resolveFolderId(wikiId, parentFolderId))
  }

  @Transactional
  fun deleteFolder(folderId: Int) {
    checkUserHasPermission()
    val children = wikiRepository.getChildrenOfParentFolder(folderId)

    if (children.isNotEmpty()) {
      error("Attempting to delete non-empty folder $folderId")
    }
    wikiRepository.deleteFolder(folderId)
  }

  @Transactional
  fun deletePage(pageId: Int) {
    checkUserHasPermission()
    wikiRepository.deletePage(pageId)
  }

  @Transactional
  fun moveFolder(
    wikiId: Int,
    folderId: Int,
    destinationFolderId: Int,
    beforeSiblingId: WikiGlobalId?,
    afterSiblingId: WikiGlobalId?
  ): WikiFolder {
    checkUserHasPermission()
    return wikiRepository.moveWikiFolder(
      wikiId,
      folderId,
      destinationFolderId,
      beforeSiblingId,
      afterSiblingId
    )
  }

  @Transactional
  fun movePage(
    wikiId: Int,
    pageId: Int,
    destinationFolderId: Int,
    beforeSiblingId: WikiGlobalId?,
    afterSiblingId: WikiGlobalId?
  ): WikiPage {
    checkUserHasPermission()
    return wikiRepository.moveWikiPage(
      wikiId,
      pageId,
      destinationFolderId,
      beforeSiblingId,
      afterSiblingId
    )
  }

  @Transactional(readOnly = true)
  fun getChildrenOfParentFolders(folderIds: Set<Int>): Map<Int, List<WikiNode>>  {
    return wikiRepository.getChildrenOfParentFolders(folderIds)
  }

  @Transactional(readOnly = true)
  fun getFolderById(folderId: Int): WikiFolder? {
    return wikiRepository.getFolderById(folderId)
  }

  @Transactional(readOnly = true)
  fun getChildrenOfRootFolder(wikiId: Int): List<WikiNode> {
    val rootFolder = wikiRepository.getRootFolderByWikiId(wikiId) ?:
      error("No root folder found for wiki $wikiId")
    return wikiRepository.getChildrenOfParentFolder(rootFolder.id)
  }

  @Transactional(readOnly = true)
  fun getRootFolderByWikiId(wikiId: Int): WikiFolder? {
    return wikiRepository.getRootFolderByWikiId(wikiId)
  }

  @Transactional(readOnly = true)
  fun getWikiPageById(pageId: Int): WikiPage? {
    return wikiRepository.getWikiPageById(pageId)
  }

  fun getWikis(afterId: Int?, num: Int): List<Wiki> {
    return wikiRepository.getWikis(afterId, num)
  }

  private fun resolveFolderId(wikiId: Int, providedFolderId: Int?): Int {
    return if (providedFolderId != null) {
      providedFolderId
    } else {
      wikiRepository.getRootFolderByWikiId(wikiId)?.id
        ?: error("Integrity Error: Wiki $wikiId has no root folder")
    }
  }

  private fun checkUserHasPermission() {
    val user = userService.getLoggedInUser() ?:
    throw UserNotLoggedInException()
    if (!user.isAdmin()) {
      throw PermissionDeniedException("No permission to modify a wiki")
    }
  }
}