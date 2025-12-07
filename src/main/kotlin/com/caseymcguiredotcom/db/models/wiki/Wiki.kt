package com.caseymcguiredotcom.db.models.wiki

import generated.jooq.tables.pojos.WikiFoldersTableRow
import generated.jooq.tables.pojos.WikiPagesTableRow
import generated.jooq.tables.pojos.WikisTableRow

class Wiki(
  val id: Int,
  val name: String,
  val rootPages: List<WikiPage>,
  val rootFolders: List<WikiFolder>
) {

  companion object {
    fun fromRows(
      wikiRow: WikisTableRow,
      pageRows: List<WikiPagesTableRow>,
      folderRows: List<WikiFoldersTableRow>
    ): Wiki {
      val folderIdToFolder = folderRows.associateBy { it.id!! }
      val pageIdToPage = pageRows.associateBy { it.id!! }
      val rootFolder = folderRows.find { it.isRoot == true }
        ?: error("Root folder not found for wiki: ${wikiRow.id}")

      val rootFolders = folderRows.filter { it.parentFolderId == rootFolder.id }
      val rootPages = pageRows.filter { it.parentFolderFkId == rootFolder.id }

      val folderIdToFolderChildrenId = mutableMapOf<Int, MutableList<Int>>()
      val folderIdToPageChildren = mutableMapOf<Int, MutableList<Int>>()

      folderRows.forEach {
        val folderId = it.id!!
        val parentFolderId = it.parentFolderId
          ?: return@forEach
        val parentFolderChildren = folderIdToFolderChildrenId.getOrPut(parentFolderId) { mutableListOf() }
        parentFolderChildren.add(folderId)
      }

      pageRows.forEach {
        val pageId = it.id!!
        val parentFolderId = it.parentFolderFkId
          ?: return@forEach
        val parentFolderPageChildren = folderIdToPageChildren.getOrPut(parentFolderId) { mutableListOf() }
        parentFolderPageChildren.add(pageId)
      }

      fun buildFolder(folderRow: WikiFoldersTableRow): WikiFolder {
        val folderId = folderRow.id ?: error("Folder $folderRow has a null ID")
        val pageChildren = folderIdToPageChildren[folderId] ?: mutableListOf()
        val folderChildren = folderIdToFolderChildrenId[folderId] ?: mutableListOf()

        return WikiFolder(
          id = folderId,
          name = folderRow.name,
          displayOrder = folderRow.displayOrder,
          pages = pageChildren.map { WikiPage.fromTableRow(pageIdToPage[it]!!) },
          folders = folderChildren.map { buildFolder(folderIdToFolder[it]!!) }
        )
      }

      return Wiki(
        id = wikiRow.id ?: error("Wiki ID is null"),
        name = wikiRow.name,
        rootPages = rootPages.map { WikiPage.fromTableRow(it) },
        rootFolders = rootFolders.map { buildFolder(it) }
      )
    }
  }
}
