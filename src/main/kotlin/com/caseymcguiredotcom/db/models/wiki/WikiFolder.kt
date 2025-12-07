package com.caseymcguiredotcom.db.models.wiki

class WikiFolder(
  val id: Int,
  val name: String,
  val displayOrder: String,
  val pages: List<WikiPage>,
  val folders: List<WikiFolder>
) {
  fun toWikiNode(): WikiNode {
    return WikiNodeFolder(this)
  }
}