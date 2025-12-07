package com.caseymcguiredotcom.db.models.wiki

import com.caseymcguiredotcom.codegen.graphql.types.Wiki
import com.caseymcguiredotcom.codegen.graphql.types.WikiFolder
import com.caseymcguiredotcom.codegen.graphql.types.WikiPage
import com.caseymcguiredotcom.codegen.graphql.types.WikiSidebarMenuItem

fun com.caseymcguiredotcom.db.models.wiki.Wiki.toGraphqlType(): com.caseymcguiredotcom.codegen.graphql.types.Wiki {

  val rootNodes = this.rootPages.map { it.toWikiNode() } +
      this.rootFolders.map { it.toWikiNode() }

  return Wiki(
    id = this.id.toString(),
    name = this.name,
    sidebar = rootNodes.sortedBy { it.displayOrder }
      .map { it.toWikiSidebarMenuItem() }
  )
}

fun com.caseymcguiredotcom.db.models.wiki.WikiPage.toGraphqlType(): WikiPage {
  return WikiPage(
    id = this.id.toString(),
    name = this.name,
    content = this.content
  )
}

fun WikiNode.toWikiSidebarMenuItem(): WikiSidebarMenuItem {
  return when (this) {
    is WikiNodePage -> {
      WikiPage(
        id = this.page.id.toString(),
        name = this.page.name,
        content = this.page.content
      )
    }
    is WikiNodeFolder -> {
      val childrenNodes = this.folder.folders.map { it.toWikiNode() } +
          this.folder.pages.map { it.toWikiNode() }
      WikiFolder(
        id = this.folder.id.toString(),
        name = this.folder.name,
        children = childrenNodes.sortedBy { it.displayOrder }
          .map { it.toWikiSidebarMenuItem() }
      )
    }
  }
}

fun com.caseymcguiredotcom.db.models.wiki.WikiFolder.toGraphqlType(): WikiFolder {

  val childrenNodes = this.folders.map { it.toWikiNode() } +
      this.pages.map { it.toWikiNode() }
  return WikiFolder(
    id = this.id.toString(),
    name = this.name,
    children = childrenNodes.sortedBy { it.displayOrder }
      .map { it.toWikiSidebarMenuItem() }
  )
}