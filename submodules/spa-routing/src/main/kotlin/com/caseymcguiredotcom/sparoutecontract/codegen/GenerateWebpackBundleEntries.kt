package com.caseymcguiredotcom.sparoutecontract.codegen

import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinitionDiscovery
import java.nio.file.Files
import java.nio.file.Path
import kotlin.system.exitProcess

fun main() {
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

  Files.writeString(Path.of(outputDirectoryPath), fileContents)

  exitProcess(0)
}
