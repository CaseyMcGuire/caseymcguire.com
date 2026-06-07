package com.caseymcguiredotcom.scripts

import com.caseymcguiredotcom.routes.RouteConverter
import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinitionDiscovery
import java.nio.file.Files
import java.nio.file.Path
import kotlin.system.exitProcess


fun main(args: Array<String>) {
  val outputDirectoryPath = System.getProperty("route.output.dir")
    ?: throw IllegalArgumentException("'route.output.dir' must be set in task config")
  val configs = SpaApplicationDefinitionDiscovery.discoverFromSystemProperty()
  val routeConverter = RouteConverter()

  val configNameToTypeScriptObjectEntries = mutableMapOf<String, List<TypeScriptRouteConfig>>()
  for (config in configs) {
    val configName = config.name.replace(" ", "")
    if (configNameToTypeScriptObjectEntries.containsKey(configName)) {
      throw IllegalStateException("Duplicate config name: $configName")
    }

    val routeIds = mutableSetOf<String>()
    configNameToTypeScriptObjectEntries[configName] = config.routes.map { route ->
      val routeId = route.id
      if (!routeIds.add(routeId)) {
        throw IllegalStateException("Duplicate route id: ${route.id} in config: $configName")
      }
      TypeScriptRouteConfig(
        routeId,
        routeConverter.convertToReactRouter(config.getFullUrl(route.path))
      )
    }
  }

  val fileNameToContent = configNameToTypeScriptObjectEntries.map { entry ->
    val typeName = "${entry.key}Route"
    val objectName = "${entry.key}Routes"
    val typescriptObjectEntries = entry.value.sortedBy { it.key }

    objectName to buildString {
      appendLine("// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.")
      appendLine("// Run './gradlew generateClientRoutes' to regenerate.")
      appendLine()
      appendLine("export const $objectName = {")
      typescriptObjectEntries.forEach { (key, value) ->
        appendLine("""  $key: "$value",""")
      }
      appendLine("} as const;")
      appendLine()
      appendLine("export type $typeName = keyof typeof $objectName;")
    }
  }.toMap()


  if (Files.notExists(Path.of(outputDirectoryPath))) {
    Files.createDirectories(Path.of(outputDirectoryPath))
  }

  for ((fileName, content) in fileNameToContent) {
    val outputPath: Path =
      Path.of("${outputDirectoryPath}/${fileName}.ts")
    Files.writeString(outputPath, content)
  }

  Files.list(Path.of(outputDirectoryPath)).use { stream ->
    stream
      .filter { Files.isRegularFile(it) }
      .filter { !fileNameToContent.keys.contains(it.fileName.toString().substringBeforeLast(".")) }
      .forEach {
        Files.delete(it)
      }
  }

  exitProcess(0)
}

private data class TypeScriptRouteConfig(val key: String, val value: String)
