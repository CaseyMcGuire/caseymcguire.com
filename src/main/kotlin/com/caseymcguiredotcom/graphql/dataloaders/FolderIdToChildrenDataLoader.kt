package com.caseymcguiredotcom.graphql.dataloaders

import com.caseymcguiredotcom.codegen.graphql.types.WikiFolder
import com.caseymcguiredotcom.codegen.graphql.types.WikiSidebarMenuItem
import com.caseymcguiredotcom.config.DataLoaderConfig.Companion.DATA_LOADER_EXECUTOR
import com.caseymcguiredotcom.db.models.wiki.toWikiSidebarMenuItem
import com.caseymcguiredotcom.graphql.fromGlobalIdOrThrow
import com.caseymcguiredotcom.graphql.toGlobalId
import com.caseymcguiredotcom.services.WikiService
import com.netflix.graphql.dgs.DgsDataLoader
import org.dataloader.MappedBatchLoader
import org.springframework.beans.factory.annotation.Qualifier
import java.util.concurrent.CompletableFuture
import java.util.concurrent.CompletionStage
import java.util.concurrent.Executor

@DgsDataLoader
class FolderIdToChildrenDataLoader(
  private val wikiService: WikiService,
  @param:Qualifier(DATA_LOADER_EXECUTOR) private val executor: Executor
) : MappedBatchLoader<String, List<WikiSidebarMenuItem>> {
  override fun load(parentFolderIds: Set<String>): CompletionStage<Map<String, List<WikiSidebarMenuItem>>> {
    val parentFolderIdsAsInts = parentFolderIds.map { fromGlobalIdOrThrow(it) }.toSet()
    return CompletableFuture.supplyAsync({
      wikiService.getChildrenOfParentFolders(parentFolderIdsAsInts)
        .entries.associate { entry ->
          toGlobalId(WikiFolder::class, entry.key) to entry.value.map { it.toWikiSidebarMenuItem() }
        }
    }, executor)
  }
}