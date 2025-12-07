package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.db.models.wiki.Wiki
import com.caseymcguiredotcom.db.models.wiki.WikiFolder
import com.caseymcguiredotcom.db.models.wiki.WikiPage
import com.caseymcguiredotcom.lib.exceptions.PermissionDeniedException
import com.caseymcguiredotcom.lib.exceptions.UserNotLoggedInException
import com.caseymcguiredotcom.repositories.wiki.WikiRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

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
  fun createWiki(name: String): Wiki {
    checkUserHasPermission()
    return wikiRepository.createWiki(name)
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
  fun moveFolder(
    wikiId: Int,
    folderId: Int,
    destinationFolderId: Int,
    beforeSiblingId: Int?,
    afterSiblingId: Int?): WikiFolder {
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
    beforeSiblingId: Int?,
    afterSiblingId: Int?): WikiPage {
    checkUserHasPermission()
    return wikiRepository.moveWikiPage(
      wikiId,
      pageId,
      destinationFolderId,
      beforeSiblingId,
      afterSiblingId
    )
  }

  private fun resolveFolderId(wikiId: Int, providedFolderId: Int?): Int {
    return if (providedFolderId != null) {
      providedFolderId
    } else {
      wikiRepository.getRootFolderIdByWikiId(wikiId)
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