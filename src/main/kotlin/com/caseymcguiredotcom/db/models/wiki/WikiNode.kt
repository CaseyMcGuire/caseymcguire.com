package com.caseymcguiredotcom.db.models.wiki

sealed interface WikiNode {
  val id: Int
  val wikiId: Int
  val displayOrder: String
  val type: WikiNodeType
}

data class WikiNodeFolder(val folder: WikiFolder) : WikiNode {
  override val id = folder.id
  override val displayOrder: String = folder.displayOrder
  override val type = WikiNodeType.FOLDER
  override val wikiId = folder.wikiId
}
data class WikiNodePage(val page: WikiPage) : WikiNode {
  override val id = page.id
  override val displayOrder: String = page.displayOrder
  override val type = WikiNodeType.PAGE
  override val wikiId = page.wikiId
}


