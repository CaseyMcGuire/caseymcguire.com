package com.caseymcguiredotcom.scripts

import com.caseymcguiredotcom.Application
import com.caseymcguiredotcom.routes.ConversionResult
import com.caseymcguiredotcom.routes.RouteConverter
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import org.springframework.boot.WebApplicationType
import org.springframework.boot.builder.SpringApplicationBuilder
import java.nio.file.Files
import java.nio.file.Path
import kotlin.system.exitProcess


fun main(args: Array<String>) {
  val ctx = SpringApplicationBuilder(Application::class.java)
    .properties(
      mapOf(
        "server.port" to "0"
      )
    )
    .run()

  try {
    val configs = ctx.getBeansOfType(SinglePageApplicationConfig::class.java).values
    val routeConverter = ctx.getBean(RouteConverter::class.java)

    val configNameToTypeScriptObjectEntries = configs.associate { config ->
      config.name.replace(" ", "") to config.routes.map { route ->
        TypeScriptRouteConfig(
          route.name.uppercase(),
          routeConverter.convertToReactRouter(config.getFullUrl(route.path)
          )
        )
      }
    }

    val fileNameToContent = configNameToTypeScriptObjectEntries.map {
      val typeName = "${it.key}Route"
      val objectName = "${it.key}Routes"

      objectName to buildString {
        appendLine("// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.")
        appendLine("// Generated from SinglePageApplicationConfig beans.")
        appendLine()
        appendLine("export const $objectName = {")
        it.value.forEach { (key, value) ->
          appendLine("""  $key: "$value",""")
        }
        appendLine("} as const;")
        appendLine()
        appendLine("export type $typeName = keyof typeof $objectName;")
      }
    }.toMap()

    for ((fileName, content) in fileNameToContent) {
      val outputPath: Path =
        Path.of("src/main/web-frontend/__generated__/routes/${fileName}.ts")
      Files.writeString(outputPath, content)
    }
  } finally {
    ctx.close()
  }

  exitProcess(0)
}

private data class TypeScriptRouteConfig(val key: String, val value: String)
