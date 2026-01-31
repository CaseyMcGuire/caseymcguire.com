package com.caseymcguiredotcom.repositories.wiki

import com.caseymcguiredotcom.db.models.wiki.Wiki
import com.caseymcguiredotcom.db.models.wiki.WikiFolder
import com.caseymcguiredotcom.db.models.wiki.WikiNode
import com.caseymcguiredotcom.db.models.wiki.WikiNodeType
import com.caseymcguiredotcom.db.models.wiki.WikiPage
import com.caseymcguiredotcom.graphql.query.WikiFetcher
import com.caseymcguiredotcom.graphql.query.WikiGlobalId
import com.caseymcguiredotcom.lib.LexoRank
import com.caseymcguiredotcom.lib.Time
import com.caseymcguiredotcom.lib.exceptions.EntityNotFoundException
import generated.jooq.tables.pojos.WikiFoldersTableRow
import generated.jooq.tables.pojos.WikiPagesTableRow
import generated.jooq.tables.pojos.WikisTableRow
import generated.jooq.tables.references.WIKIS
import generated.jooq.tables.references.WIKI_FOLDERS
import generated.jooq.tables.references.WIKI_PAGES
import org.jooq.DSLContext
import org.jooq.impl.DSL
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional


@Repository
class WikiRepository(
  private val context: DSLContext,
  private val time: Time
) {

  private val log = LoggerFactory.getLogger(WikiFetcher::class.java)

  companion object {
    const val MAX_DEPTH = 3
    const val MAX_TRAVERSAL_LIMIT = 100
  }

  @Transactional(propagation = Propagation.MANDATORY)
  fun createWiki(name: String): Wiki {
    val wiki = context
      .insertInto(WIKIS)
      .set(WIKIS.NAME, name)
      .returning()
      .fetchOneInto(WikisTableRow::class.java)
      ?: error("Unable to create wiki")

    return Wiki.fromRows(wiki)
  }

  @Transactional(propagation = Propagation.MANDATORY)
  fun deleteFolder(folderId: Int) {
    lockFolder(folderId)
    val numDeleted = context.deleteFrom(WIKI_FOLDERS)
      .where(WIKI_FOLDERS.ID.eq(folderId))
      .execute()
    if (numDeleted == 0) {
      error("Unable to delete folder with ID: $folderId")
    }
  }

  fun deletePage(pageId: Int) {
    val numDeleted = context.deleteFrom(WIKI_PAGES)
      .where(WIKI_PAGES.ID.eq(pageId))
      .execute()
    if (numDeleted == 0) {
      error("No page with id: $pageId")
    }
  }

  @Transactional(propagation = Propagation.MANDATORY)
  fun createRootFolder(name: String, wikiId: Int): WikiFolder {
    val folder = context
      .insertInto(WIKI_FOLDERS)
      .set(WIKI_FOLDERS.NAME, name)
      .set(WIKI_FOLDERS.WIKI_ID, wikiId)
      .set(WIKI_FOLDERS.DISPLAY_ORDER, "a")
      .set(WIKI_FOLDERS.IS_ROOT, true)
      .returning()
      .fetchOneInto(WikiFoldersTableRow::class.java)
      ?: error("Unable to create root folder")

    return WikiFolder.fromTableRow(folder)
  }

  fun getFolderById(id: Int): WikiFolder? {
    val folderRow = context
      .selectFrom(WIKI_FOLDERS)
      .where(WIKI_FOLDERS.ID.eq(id))
      .fetchOneInto(WikiFoldersTableRow::class.java)
    ?: return null

    return WikiFolder.fromTableRow(folderRow)
  }

  fun getWikiById(wikiId: Int): Wiki? {
    val wiki = context
      .selectFrom(WIKIS)
      .where(WIKIS.ID.eq(wikiId))
      .fetchOneInto(WikisTableRow::class.java)
      ?: return null

    return Wiki.fromRows(wiki)
  }

  fun getWikiPageById(id: Int): WikiPage? {
    val page = context.selectFrom(WIKI_PAGES)
      .where(WIKI_PAGES.ID.eq(id))
      .fetchOneInto(WikiPagesTableRow::class.java)
      ?: return null
    return WikiPage.fromTableRow(page)
  }

  fun getRootFolderByWikiId(wikiId: Int): WikiFolder? {
    val row = context.selectFrom(WIKI_FOLDERS)
      .where(
        WIKI_FOLDERS.WIKI_ID.eq(wikiId),
        WIKI_FOLDERS.IS_ROOT.eq(true)
      )
      .fetchOneInto(WikiFoldersTableRow::class.java)
      ?: return null

    return WikiFolder.fromTableRow(row)
  }

  @Transactional(propagation = Propagation.MANDATORY)
  fun createWikiFolder(wikiId: Int, folderName: String, parentFolderId: Int): WikiFolder {
    lockFolder(wikiId, parentFolderId)

    val nextOrder = getNextDisplayOrderForFolder(wikiId, parentFolderId)
    val folder = context
      .insertInto(WIKI_FOLDERS)
      .set(WIKI_FOLDERS.WIKI_ID, wikiId)
      .set(WIKI_FOLDERS.NAME, folderName)
      .set(WIKI_FOLDERS.PARENT_FOLDER_ID, parentFolderId)
      .set(WIKI_FOLDERS.DISPLAY_ORDER, nextOrder)
      .returning()
      .fetchOneInto(WikiFoldersTableRow::class.java)
      ?: error("Wiki folder not found")

    return WikiFolder.fromTableRow(folder)
  }

  fun updateWikiPageContent(
    pageId: Int,
    name: String,
    content: String
  ): WikiPage {
    return context.update(WIKI_PAGES)
      .set(WIKI_PAGES.CONTENT, content)
      .set(WIKI_PAGES.NAME, name)
      .where(WIKI_PAGES.ID.eq(pageId))
      .returning()
      .fetchOneInto(WikiPagesTableRow::class.java)
      ?.let {
        WikiPage.fromTableRow(it)
      }
      ?: error("Unable to update content for page: $pageId")
  }

  fun updateWikiPageName(
    pageId: Int,
    title: String
  ): WikiPage {
    return context.update(WIKI_PAGES)
      .set(WIKI_PAGES.NAME, title)
      .where(WIKI_PAGES.ID.eq(pageId))
      .returning()
      .fetchOneInto(WikiPagesTableRow::class.java)
      ?.let {
        WikiPage.fromTableRow(it)
      } ?: error("Unable to update content for page: $pageId")
  }

  fun updateWikiFolderName(
    folderId: Int,
    title: String
  ): WikiFolder {
    return context.update(WIKI_FOLDERS)
      .set(WIKI_FOLDERS.NAME, title)
      .where(WIKI_FOLDERS.ID.eq(folderId))
      .returning()
      .fetchOneInto(WikiFoldersTableRow::class.java)
      ?.let {
        WikiFolder.fromTableRow(it)
      } ?: error("Unable to update content for page: $folderId")
  }

  fun getNextDisplayOrderForFolder(wikiId: Int, parentFolderId: Int): String {
    val maxPageOrder = context.select(DSL.max(WIKI_PAGES.DISPLAY_ORDER))
      .from(WIKI_PAGES)
      .where(
        WIKI_PAGES.WIKI_ID.eq(wikiId),
        WIKI_PAGES.PARENT_FOLDER_FK_ID.eq(parentFolderId)
      )
      .fetchOneInto(String::class.java)

    val maxFolderOrder = context.select(DSL.max(WIKI_FOLDERS.DISPLAY_ORDER))
      .from(WIKI_FOLDERS)
      .where(
        WIKI_FOLDERS.WIKI_ID.eq(wikiId),
        WIKI_FOLDERS.PARENT_FOLDER_ID.eq(parentFolderId),
      )
      .fetchOneInto(String::class.java)

    val maxOrder = listOfNotNull(maxPageOrder, maxFolderOrder).maxOrNull()
    return LexoRank.calculateNext(maxOrder)
  }

  @Transactional(propagation = Propagation.MANDATORY)
  fun createWikiPage(wikiId: Int, pageName: String, parentFolderId: Int): WikiPage {

    lockFolder(wikiId, parentFolderId)

    val nextOrder = getNextDisplayOrderForFolder(wikiId, parentFolderId)
    val now = time.now()
    val page = context
      .insertInto(WIKI_PAGES)
      .set(WIKI_PAGES.WIKI_ID, wikiId)
      .set(WIKI_PAGES.NAME, pageName)
      .set(WIKI_PAGES.PARENT_FOLDER_FK_ID, parentFolderId)
      .set(WIKI_PAGES.CONTENT, "")
      .set(WIKI_PAGES.DISPLAY_ORDER, nextOrder)
      .set(WIKI_PAGES.CREATED_AT, now)
      .set(WIKI_PAGES.UPDATED_AT, now)
      .returning()
      .fetchOneInto(WikiPagesTableRow::class.java)
      ?: error("Wiki page not found")
    return WikiPage.fromTableRow(page)
  }

  fun getWikiByName(name: String): Wiki? {
    val wiki = context
      .selectFrom(WIKIS)
      .where(WIKIS.NAME.eq(name))
      .fetchOneInto(WikisTableRow::class.java)
      ?: return null

    return Wiki.fromRows(wiki)
  }

  @Transactional(propagation = Propagation.MANDATORY)
  fun moveWikiFolder(
    wikiId: Int,
    folderId: Int,
    destinationFolderId: Int,
    beforeSiblingId: WikiGlobalId?,
    afterSiblingId: WikiGlobalId?
  ): WikiFolder {
    listOf(destinationFolderId, folderId).sorted().forEach {
      lockFolder(wikiId, it)
    }

    // don't allow cycles
    if (
      hasCycle(
        wikiId,
        startFolderId = destinationFolderId,
        possibleAncestorFolderId = folderId
      )
    ) {
      error("[WikiRepository][moveWikiFolder] Destination folder $destinationFolderId is in the subtree of folder $folderId")
    } else if (
      folderExceedsDepthRestriction(
        wikiId = wikiId,
        folderToMoveId = folderId,
        destinationFolderId = destinationFolderId
      )
    ) {
      error("[WikiRepository][moveWikiFolder] Destination folder $destinationFolderId exceeds max depth $MAX_DEPTH")
    }

    val displayOrder = getMiddleDisplayOrder(
      wikiId,
      destinationFolderId,
      beforeSiblingId,
      afterSiblingId
    )

    val folder = context.update(WIKI_FOLDERS)
      .set(WIKI_FOLDERS.PARENT_FOLDER_ID, destinationFolderId)
      .set(WIKI_FOLDERS.DISPLAY_ORDER, displayOrder)
      .where(
        WIKI_FOLDERS.WIKI_ID.eq(wikiId),
        WIKI_FOLDERS.ID.eq(folderId),
      )
      .returning()
      .fetchOneInto(WikiFoldersTableRow::class.java)
      ?: error("Unable to update folder: $folderId")

    return WikiFolder.fromTableRow(
      folder
    )
  }

  @Transactional(propagation = Propagation.MANDATORY)
  fun moveWikiPage(
    wikiId: Int,
    pageId: Int,
    destinationFolderId: Int,
    beforeSiblingId: WikiGlobalId?,
    afterSiblingId: WikiGlobalId?
  ): WikiPage {
    val pageRow = context.selectFrom(WIKI_PAGES)
      .where(
        WIKI_PAGES.WIKI_ID.eq(wikiId),
        WIKI_PAGES.ID.eq(pageId)
      )
      .forUpdate()
      .fetchOneInto(WikiPagesTableRow::class.java)
      ?: error("No page with ID: $pageId")

    listOf(destinationFolderId, pageRow.parentFolderFkId).sorted().forEach {
      lockFolder(wikiId, it)
    }

    val nextDisplayOrder = getMiddleDisplayOrder(wikiId, destinationFolderId, beforeSiblingId, afterSiblingId)
    val page = context.update(WIKI_PAGES)
      .set(WIKI_PAGES.PARENT_FOLDER_FK_ID, destinationFolderId)
      .set(WIKI_PAGES.DISPLAY_ORDER, nextDisplayOrder)
      .where(
        WIKI_PAGES.WIKI_ID.eq(wikiId),
        WIKI_PAGES.ID.eq(pageId),
      )
      .returning()
      .fetchOneInto(WikiPagesTableRow::class.java)
      ?: error("Unable to move page: $pageId")

    return WikiPage.fromTableRow(page)
  }

  private fun getMiddleDisplayOrder(
    wikiId: Int,
    destinationFolderId: Int,
    beforeSiblingId: WikiGlobalId?,
    afterSiblingId: WikiGlobalId?
  ): String {
    val nodes = getChildrenOfParentFolder(destinationFolderId)
    val beforeResult =
      beforeSiblingId?.let { siblingId ->
        nodes.withIndex().find { it.value.id == siblingId.id && it.value.type == siblingId.type }
          ?: error("No node found for before sibling: $siblingId")
      }

    val afterResult =
      afterSiblingId?.let { siblingId ->
        nodes.withIndex().find { it.value.id == siblingId.id && it.value.type == siblingId.type }
          ?: error("No node found for after sibling: $siblingId")
      }

    if (beforeResult != null &&
      afterResult != null &&
      beforeResult.index + 1 != afterResult.index
    ) {
      error("Nodes aren't siblings. beforeResult: $beforeResult afterResult: $afterResult")
    }

    return LexoRank.calculateMiddle(
      beforeResult?.value?.displayOrder,
      afterResult?.value?.displayOrder
    )
  }

  fun folderExceedsDepthRestriction(
    wikiId: Int,
    folderToMoveId: Int,
    destinationFolderId: Int
  ): Boolean {

    val heightOfStarterFolder = getFolderHeight(folderToMoveId)
    val depthOfDestinationFolder = getFolderDepth(destinationFolderId)

    if (heightOfStarterFolder > MAX_DEPTH) {
      log.warn("[folderExceedsDepthRestriction] Folder $folderToMoveId has a height greater than max depth $MAX_DEPTH")
    }

    if (depthOfDestinationFolder > MAX_DEPTH) {
      log.warn("[folderExceedsDepthRestriction] Destination folder $destinationFolderId exceeds max depth $MAX_DEPTH")
    }

    if (depthOfDestinationFolder + heightOfStarterFolder > MAX_DEPTH) {
      return true
    }

    return false
  }

  private fun getFolderDepth(
    folderId: Int
  ): Int {
    var curId: Int? = folderId
    val visited = mutableSetOf<Int>()
    var depth = 0

    repeat (MAX_TRAVERSAL_LIMIT) {
      if (curId == null) {
        return depth
      }

      depth++

      if (!visited.add(curId)) {
        error("Cycle detected when searching for height of folder: $folderId")
      }

      curId = context.select(WIKI_FOLDERS.PARENT_FOLDER_ID)
        .from(WIKI_FOLDERS)
        .where(
          WIKI_FOLDERS.ID.eq(curId)
        ).fetchOne(WIKI_FOLDERS.PARENT_FOLDER_ID)
    }

    error("Folder $folderId has a height greater than max traversal limit $MAX_TRAVERSAL_LIMIT")
  }

  /**
   * Returns the length of the longest path of folders from the passed folder ID down to its lowest children
   */
  private fun getFolderHeight(
    folderId: Int
  ): Int {
    val visited = mutableSetOf<Int>()

    fun recurse(id: Int, depth: Int): Int {
      if (!visited.add(id)) {
        error("Cycle detected when searching for depth of folder: $folderId")
      } else if (depth >= MAX_TRAVERSAL_LIMIT) {
        error("Folder $folderId has a depth greater than $MAX_TRAVERSAL_LIMIT")
      }

      return (
          getChildrenOfParentFolder(id)
            .filter { it.type == WikiNodeType.FOLDER }
            .maxOfOrNull { recurse(it.id, depth + 1) } ?: 0
          ) + 1
    }

    return recurse(folderId, 0)
  }

  private fun hasCycle(
    wikiId: Int,
    startFolderId: Int,
    possibleAncestorFolderId: Int
  ): Boolean {
    var curId: Int? = startFolderId

    for (i in 0..MAX_TRAVERSAL_LIMIT) {

      if (curId == null) {
        return false
      }

      // found cycle
      if (curId == possibleAncestorFolderId) {
        return true
      }

      curId = context.select(WIKI_FOLDERS.PARENT_FOLDER_ID)
        .from(WIKI_FOLDERS)
        .where(
          WIKI_FOLDERS.WIKI_ID.eq(wikiId),
          WIKI_FOLDERS.ID.eq(curId)
        ).fetchOneInto(Int::class.java)
    }

    error("Folder $startFolderId has depth greater than max traversal limit: $MAX_TRAVERSAL_LIMIT")
  }

  fun getChildrenOfParentFolder(
    folderId: Int
  ): List<WikiNode> {
    val folderIdToChildren = getChildrenOfParentFolders(setOf(folderId))
    if (folderIdToChildren.size > 1) {
      error("More than one folder found for ID: $folderId")
    }
    return folderIdToChildren.entries.singleOrNull()?.value ?: emptyList()
  }


  fun getChildrenOfParentFolders(
    folderIds: Set<Int>
  ): Map<Int, List<WikiNode>> {
    val pages = context.select()
      .from(WIKI_PAGES)
      .where(
        WIKI_PAGES.PARENT_FOLDER_FK_ID
          .`in`(folderIds)
      )
      .orderBy(WIKI_PAGES.DISPLAY_ORDER)
      .fetchInto(WikiPagesTableRow::class.java)
      .map { WikiPage.fromTableRow(it) }

    val folders = context.select()
      .from(WIKI_FOLDERS)
      .where(
        WIKI_FOLDERS.PARENT_FOLDER_ID
          .`in`(folderIds)
      )
      .orderBy(WIKI_FOLDERS.DISPLAY_ORDER)
      .fetchInto(WikiFoldersTableRow::class.java)
      .map { WikiFolder.fromTableRow(it) }

    val parentFolderIdToChildrenNodes = mutableMapOf<Int, MutableList<WikiNode>>()

    for (folder in folders) {
      val parentFolderId = folder.parentFolderId ?: error("Folder ${folder.id} has no parent folder ID")
      val nodes = parentFolderIdToChildrenNodes.getOrPut(parentFolderId) { mutableListOf() }
      nodes.add(folder.toWikiNode())
    }

    for (page in pages) {
      val nodes = parentFolderIdToChildrenNodes.getOrPut(page.parentFolderId) { mutableListOf() }
      nodes.add(page.toWikiNode())
    }

    folderIds.forEach {
      parentFolderIdToChildrenNodes.getOrPut(it) {
        mutableListOf()
      }
    }

    return parentFolderIdToChildrenNodes.entries.associate { entry ->
      entry.key to entry.value.sortedBy { it.displayOrder }
    }
  }

  private fun lockFolder(folderId: Int) {
    context
      .selectFrom(WIKI_FOLDERS)
      .where(
        WIKI_FOLDERS.ID.eq(folderId)
      )
      .forUpdate()
      .fetchOne() ?: throw EntityNotFoundException("Folder $folderId not found")
  }

  private fun lockFolder(wikiId: Int, folderId: Int) {
    context
      .selectFrom(WIKI_FOLDERS)
      .where(
        WIKI_FOLDERS.ID.eq(folderId),
        WIKI_FOLDERS.WIKI_ID.eq(wikiId)
      )
      .forUpdate()
      .fetchOne() ?: throw EntityNotFoundException("Folder $folderId not found for wiki $wikiId")
  }
}
