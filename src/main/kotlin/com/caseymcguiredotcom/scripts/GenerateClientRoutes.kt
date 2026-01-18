package com.caseymcguiredotcom.scripts

import com.caseymcguiredotcom.Application
import com.caseymcguiredotcom.routes.RouteConverter
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import org.springframework.boot.builder.SpringApplicationBuilder
import java.nio.file.Files
import java.nio.file.Path
import kotlin.system.exitProcess


fun main(args: Array<String>) {
  val outputDirectoryPath = System.getProperty("route.output.dir")
    ?: throw IllegalArgumentException("'route.output.dir' must be set in task config")
  val ctx = SpringApplicationBuilder(Application::class.java)
    .run()

  try {
    val configs = ctx.getBeansOfType(SinglePageApplicationConfig::class.java).values
    val routeConverter = ctx.getBean(RouteConverter::class.java)

    val configNameToTypeScriptObjectEntries = mutableMapOf<String, List<TypeScriptRouteConfig>>()
    for (config in configs) {
      val configName = config.name.replace(" ", "")
      if (configNameToTypeScriptObjectEntries.containsKey(configName)) {
        throw IllegalStateException("Duplicate config name: $configName")
      }

      val routeNames = mutableSetOf<String>()
      configNameToTypeScriptObjectEntries[configName] = config.routes.map { route ->
        val routeName = route.name.uppercase()
        if (!routeNames.add(routeName)) {
          throw IllegalStateException("Duplicate route name: ${route.name} in config: $configName")
        }
        routeNames.add(routeName)
        TypeScriptRouteConfig(
          routeName,
          routeConverter.convertToReactRouter(config.getFullUrl(route.path)
          )
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
  } finally {
    ctx.close()
  }

  exitProcess(0)
}

private data class TypeScriptRouteConfig(val key: String, val value: String)
