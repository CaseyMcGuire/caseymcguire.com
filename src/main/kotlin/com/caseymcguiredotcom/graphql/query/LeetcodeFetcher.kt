package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.DgsConstants
import com.caseymcguiredotcom.codegen.graphql.types.LeetCodeRoot
import com.caseymcguiredotcom.codegen.graphql.types.LeetcodeDifficulty
import com.caseymcguiredotcom.codegen.graphql.types.LeetcodeProblem
import com.caseymcguiredotcom.codegen.graphql.types.LeetcodeTopic
import com.caseymcguiredotcom.codegen.graphql.types.LeetcodeTopic.*
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsData
import com.netflix.graphql.dgs.DgsQuery

@DgsComponent
class LeetcodeFetcher {

  @DgsData(
    parentType = DgsConstants.LEETCODEROOT.TYPE_NAME,
    field = DgsConstants.LEETCODEROOT.Problems
  )
  fun getLeetcodeProblems(): List<LeetcodeProblem> {
    return listOf(
      LeetcodeProblem(
        id = 817,
        name = "Linked List Components",
        url = "https://leetcode.com/problems/linked-list-components/description/",
        difficulty = LeetcodeDifficulty.MEDIUM,
        topics = listOf(LINKED_LIST)
      ),
      LeetcodeProblem(
        id = 167,
        name = "Two Sum II - Input Array Is Sorted",
        url = "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/",
        difficulty = LeetcodeDifficulty.MEDIUM,
        topics = listOf(
          HASH_TABLE,
          BINARY_SEARCH
        )
      )
    )
  }

  @DgsQuery(field = DgsConstants.QUERY.Leetcode)
  fun leetcodeRoot(): LeetCodeRoot {
    return LeetCodeRoot()
  }
}