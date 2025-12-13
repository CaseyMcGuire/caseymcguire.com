package com.caseymcguiredotcom.scripts

import com.caseymcguiredotcom.Application
import com.caseymcguiredotcom.routes.RouteConverter
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import org.springframework.boot.builder.SpringApplicationBuilder
import java.nio.file.Files
import java.nio.file.Path
import kotlin.system.exitProcess
import kotlin.use

fun main(args: Array<String>) {
  val outputDirectoryPath = System.getProperty("route.output.dir")
    ?: throw IllegalArgumentException("'route.output.dir' must be set in task config")
  val ctx = SpringApplicationBuilder(Application::class.java)
    .run()

  try {
    val configs = ctx.getBeansOfType(SinglePageApplicationConfig::class.java)
      .values
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
  } finally {
    ctx.close()
  }

  exitProcess(0)
}