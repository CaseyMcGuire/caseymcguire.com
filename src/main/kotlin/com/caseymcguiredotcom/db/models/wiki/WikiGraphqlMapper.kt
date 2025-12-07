package com.caseymcguiredotcom.db.models.wiki

import com.caseymcguiredotcom.codegen.graphql.types.Wiki
import com.caseymcguiredotcom.codegen.graphql.types.WikiFolder
import com.caseymcguiredotcom.codegen.graphql.types.WikiPage
import com.caseymcguiredotcom.codegen.graphql.types.WikiSidebarMenuItem

fun com.caseymcguiredotcom.db.models.wiki.Wiki.toGraphqlType(): com.caseymcguiredotcom.codegen.graphql.types.Wiki {

  fun recurse(node: WikiNode): WikiSidebarMenuItem {
    return when (node) {
      is WikiNodePage -> {
        WikiPage(
          id = node.page.id.toString(),
          name = node.page.name,
          content = node.page.content
        )
      }
      is WikiNodeFolder -> {
        val childrenNodes = node.folder.folders.map { it.toWikiNode() } +
            node.folder.pages.map { it.toWikiNode() }
        WikiFolder(
          id = node.folder.id.toString(),
          name = node.folder.name,
          children = childrenNodes.sortedBy { it.displayOrder }
            .map { recurse(it) }
        )
      }
    }
  }

  val rootNodes = this.rootPages.map { it.toWikiNode() } +
      this.rootFolders.map { it.toWikiNode() }

  return Wiki(
    id = this.id.toString(),
    name = this.name,
    sidebar = rootNodes.sortedBy { it.displayOrder }
      .map { recurse(it) }
  )
}

fun com.caseymcguiredotcom.db.models.wiki.WikiPage.toGraphqlType(): WikiPage {
  return WikiPage(
    id = this.id.toString(),
    name = this.name,
    content = this.content
  )
}