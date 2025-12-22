package com.caseymcguiredotcom.db.models.wiki

import com.caseymcguiredotcom.codegen.graphql.types.GqlWiki
import com.caseymcguiredotcom.codegen.graphql.types.GqlWikiFolder
import com.caseymcguiredotcom.codegen.graphql.types.GqlWikiNode
import com.caseymcguiredotcom.codegen.graphql.types.GqlWikiPage
import com.caseymcguiredotcom.graphql.toGlobalId

fun Wiki.toGraphqlType(): GqlWiki {
  return GqlWiki(
    id = toGlobalId("Wiki", this.id),
    name = this.name
  )
}

fun WikiPage.toGraphqlType(): GqlWikiPage {
  return GqlWikiPage(
    id = toGlobalId("WikiPage", this.id),
    name = this.name,
    content = this.content
  )
}

fun WikiNode.toGqlWikiNode(): GqlWikiNode {
  return when (this) {
    is WikiNodePage -> {
      GqlWikiPage(
        id = toGlobalId("WikiPage", this.page.id),
        name = this.page.name,
        content = this.page.content
      )
    }
    is WikiNodeFolder -> {
      GqlWikiFolder(
        id = toGlobalId("WikiFolder", this.folder.id),
        name = this.folder.name,
      )
    }
  }
}

fun WikiFolder.toGraphqlType(): GqlWikiFolder {
  return GqlWikiFolder(
    id = toGlobalId("WikiFolder", this.id),
    name = this.name,
  )
}