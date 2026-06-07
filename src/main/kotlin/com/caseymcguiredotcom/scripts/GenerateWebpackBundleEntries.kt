package com.caseymcguiredotcom.scripts

import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinitionDiscovery
import java.nio.file.Files
import java.nio.file.Path
import kotlin.system.exitProcess

fun main(args: Array<String>) {
  val outputDirectoryPath = System.getProperty("route.output.dir")
    ?: throw IllegalArgumentException("'route.output.dir' must be set in task config")
  val configs = SpaApplicationDefinitionDiscovery.discoverFromSystemProperty()
    .sortedBy { it.name }

  val fileContents = buildString {
    appendLine("// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.")
    appendLine("// Run './gradlew generateWebpackBundleEntries' to regenerate.")
    appendLine("export default {")
    configs.forEach {
      appendLine("  ${it.bundleName} : \"${it.appRootPath}\",")
    }
    appendLine("}")
  }

  val outputPath =
    Path.of(outputDirectoryPath)
  Files.writeString(outputPath, fileContents)

  exitProcess(0)
}
