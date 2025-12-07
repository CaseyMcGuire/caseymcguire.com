package com.caseymcguiredotcom.db.models.wiki

sealed interface WikiNode {
  val displayOrder: String
}

data class WikiNodeFolder(val folder: WikiFolder) : WikiNode {
  override val displayOrder: String = folder.displayOrder
}
data class WikiNodePage(val page: WikiPage) : WikiNode {
  override val displayOrder: String = page.displayOrder
}


