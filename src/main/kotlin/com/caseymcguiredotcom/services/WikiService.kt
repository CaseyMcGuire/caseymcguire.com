package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.db.models.wiki.Wiki
import com.caseymcguiredotcom.db.models.wiki.WikiPage
import com.caseymcguiredotcom.lib.exceptions.PermissionDeniedException
import com.caseymcguiredotcom.lib.exceptions.UserNotLoggedInException
import com.caseymcguiredotcom.repositories.WikiRepository
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

  @Transactional
  fun createWiki(name: String): Wiki {
    checkUserHasPermission()
    return wikiRepository.createWiki(name)
  }

  @Transactional
  fun createWikiPage(wikiId: Int, pageName: String, folderId: Int?): WikiPage {
    checkUserHasPermission()
    return if (folderId != null) {
      wikiRepository.createWikiPage(wikiId, pageName, folderId)
    }
    else {
      val rootFolderId = wikiRepository.getRootFolderIdByWikiId(wikiId)
        ?: error("No root folder")
      wikiRepository.createWikiPage(wikiId, pageName, rootFolderId)
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