package com.caseymcguiredotcom.db.models.wiki

import com.caseymcguiredotcom.codegen.graphql.types.GqlWikiNode
import com.caseymcguiredotcom.codegen.graphql.types.Wiki
import com.caseymcguiredotcom.codegen.graphql.types.WikiFolder
import com.caseymcguiredotcom.codegen.graphql.types.WikiPage
import com.caseymcguiredotcom.codegen.graphql.types.WikiSidebarMenuItem
import com.caseymcguiredotcom.graphql.toGlobalId

fun com.caseymcguiredotcom.db.models.wiki.Wiki.toGraphqlType(): com.caseymcguiredotcom.codegen.graphql.types.Wiki {
  return Wiki(
    id = toGlobalId("Wiki", this.id),
    name = this.name
  )
}

fun com.caseymcguiredotcom.db.models.wiki.WikiPage.toGraphqlType(): WikiPage {
  return WikiPage(
    id = toGlobalId("WikiPage", this.id),
    name = this.name,
    content = this.content
  )
}

fun WikiNode.toGqlWikiNode(): GqlWikiNode {
  return when (this) {
    is WikiNodePage -> {
      WikiPage(
        id = toGlobalId("WikiPage",this.page.id),
        name = this.page.name,
        content = this.page.content
      )
    }
    is WikiNodeFolder -> {
      WikiFolder(
        id = toGlobalId("WikiFolder", this.folder.id),
        name = this.folder.name,
      )
    }
  }
}

fun com.caseymcguiredotcom.db.models.wiki.WikiFolder.toGraphqlType(): WikiFolder {
  return WikiFolder(
    id = toGlobalId("WikiFolder", this.id),
    name = this.name,
  )
}