package com.caseymcguiredotcom.db.models.wiki

import com.caseymcguiredotcom.codegen.graphql.types.Wiki
import com.caseymcguiredotcom.codegen.graphql.types.WikiFolder
import com.caseymcguiredotcom.codegen.graphql.types.WikiPage
import com.caseymcguiredotcom.codegen.graphql.types.WikiSidebarMenuItem
import com.caseymcguiredotcom.graphql.toGlobalId

fun com.caseymcguiredotcom.db.models.wiki.Wiki.toGraphqlType(): com.caseymcguiredotcom.codegen.graphql.types.Wiki {

  val rootNodes = this.rootPages.map { it.toWikiNode() } +
      this.rootFolders.map { it.toWikiNode() }

  return Wiki(
    id = toGlobalId("Wiki", this.id),
    name = this.name,
    sidebar = rootNodes.sortedBy { it.displayOrder }
      .map { it.toWikiSidebarMenuItem() }
  )
}

fun com.caseymcguiredotcom.db.models.wiki.WikiPage.toGraphqlType(): WikiPage {
  return WikiPage(
    id = toGlobalId("WikiPage", this.id),
    name = this.name,
    content = this.content
  )
}

fun WikiNode.toWikiSidebarMenuItem(): WikiSidebarMenuItem {
  return when (this) {
    is WikiNodePage -> {
      WikiPage(
        id = toGlobalId("WikiPage",this.page.id),
        name = this.page.name,
        content = this.page.content
      )
    }
    is WikiNodeFolder -> {
      val childrenNodes = this.folder.folders.map { it.toWikiNode() } +
          this.folder.pages.map { it.toWikiNode() }
      WikiFolder(
        id = toGlobalId("WikiFolder", this.folder.id),
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
    id = toGlobalId("WikiFolder", this.id),
    name = this.name,
    children = childrenNodes.sortedBy { it.displayOrder }
      .map { it.toWikiSidebarMenuItem() }
  )
}