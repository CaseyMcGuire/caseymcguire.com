package com.caseymcguiredotcom.repositories

import com.caseymcguiredotcom.db.models.wiki.Wiki
import com.caseymcguiredotcom.db.models.wiki.WikiPage
import com.caseymcguiredotcom.lib.LexoRank
import com.caseymcguiredotcom.lib.Time
import generated.jooq.tables.pojos.WikiFoldersTableRow
import generated.jooq.tables.pojos.WikiPagesTableRow
import generated.jooq.tables.pojos.WikisTableRow
import generated.jooq.tables.references.WIKIS
import generated.jooq.tables.references.WIKI_FOLDERS
import generated.jooq.tables.references.WIKI_PAGES
import org.jooq.DSLContext
import org.jooq.impl.DSL
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional

@Repository
class WikiRepository(
  private val context: DSLContext,
  private val time: Time
) {
  fun createWiki(name: String): Wiki {
    val wiki = context
      .insertInto(WIKIS)
      .set(WIKIS.NAME, name)
      .returning()
      .fetchOneInto(WikisTableRow::class.java)
      ?: error("Unable to create wiki")

    val rootFolder = context
      .insertInto(WIKI_FOLDERS)
      .set(WIKI_FOLDERS.NAME, "${name}_wiki_root_folder")
      .set(WIKI_FOLDERS.DISPLAY_ORDER, "a")
      .set(WIKI_FOLDERS.WIKI_ID, wiki.id)
      .set(WIKI_FOLDERS.IS_ROOT, true)
      .returning()
      .fetchOneInto(WikiFoldersTableRow::class.java)
      ?: error("Unable to create root folder")

    return Wiki.fromRows(wiki, emptyList(), listOf(rootFolder))
  }

  fun getRootFolderIdByWikiId(wikiId: Int): Int? {
    return context.select(WIKI_FOLDERS.ID)
      .from(WIKI_FOLDERS)
      .where(
        WIKI_FOLDERS.WIKI_ID.eq(wikiId),
        WIKI_FOLDERS.IS_ROOT.eq(true)
      )
      .fetchOneInto(Int::class.java)

  }

  @Transactional(propagation = Propagation.MANDATORY)
  fun createWikiPage(wikiId: Int, pageName: String, folderId: Int): WikiPage {

    // acquire lock on parent folder
    context
      .selectFrom(WIKI_FOLDERS)
      .where(
        WIKI_FOLDERS.WIKI_ID.eq(wikiId),
        WIKI_FOLDERS.ID.eq(folderId)
      )
      .forUpdate()
      .fetchOne()
      ?: error("Parent folder not found")

    val maxPageOrder = context.select(DSL.max(WIKI_PAGES.DISPLAY_ORDER))
      .from(WIKI_PAGES)
      .where(
        WIKI_PAGES.WIKI_ID.eq(wikiId),
        WIKI_PAGES.PARENT_FOLDER_FK_ID.eq(folderId)
      )
      .fetchOneInto(String::class.java)

    val maxFolderOrder = context.select(DSL.max(WIKI_FOLDERS.DISPLAY_ORDER))
      .from(WIKI_FOLDERS)
      .where(
        WIKI_FOLDERS.WIKI_ID.eq(wikiId),
        WIKI_FOLDERS.PARENT_FOLDER_ID.eq(folderId),
        )
      .fetchOneInto(String::class.java)

    val maxOrder = listOfNotNull(maxPageOrder, maxFolderOrder).maxOrNull()
    val nextOrder = LexoRank.calculateNext(maxOrder)
    val now = time.now()
    val page = context
      .insertInto(WIKI_PAGES)
      .set(WIKI_PAGES.WIKI_ID, wikiId)
      .set(WIKI_PAGES.NAME, pageName)
      .set(WIKI_PAGES.PARENT_FOLDER_FK_ID, folderId)
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

    val pages = context.select()
      .from(WIKI_PAGES)
      .where(WIKI_PAGES.WIKI_ID.eq(wiki.id))
      .fetchInto(WikiPagesTableRow::class.java)

    val folders = context.select()
      .from(WIKI_FOLDERS)
      .where(WIKI_FOLDERS.WIKI_ID.eq(wiki.id))
      .fetchInto(WikiFoldersTableRow::class.java)

    return Wiki.fromRows(wiki, pages, folders)
  }
}
