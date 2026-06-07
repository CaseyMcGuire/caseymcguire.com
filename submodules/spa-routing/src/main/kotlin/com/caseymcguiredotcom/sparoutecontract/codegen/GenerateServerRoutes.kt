package com.caseymcguiredotcom.sparoutecontract.codegen

import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinitionDiscovery
import com.caseymcguiredotcom.sparoutecontract.SpaRouteDefinition
import com.caseymcguiredotcom.sparoutecontract.SpaRouteParameter
import com.caseymcguiredotcom.sparoutecontract.SpaRouteParameterType
import java.nio.file.Files
import java.nio.file.Path
import java.util.Comparator
import kotlin.io.path.createDirectories

private const val GENERATED_PACKAGE = "com.caseymcguiredotcom.generated.spa.routes"

fun main() {
  val outputDirectoryPath = System.getProperty("route.output.dir")
    ?: throw IllegalArgumentException("'route.output.dir' must be set in task config")
  val outputDirectory = Path.of(outputDirectoryPath)
  outputDirectory.createDirectories()
  cleanGeneratedFiles(outputDirectory)

  SpaApplicationDefinitionDiscovery.discoverFromSystemProperty()
    .sortedBy { it.name }
    .forEach { application ->
      Files.writeString(
        outputDirectory.resolve("${application.routesObjectName()}.kt"),
        application.toKotlinRoutesObjectFile()
      )

      val routeOutputDirectory = outputDirectory.resolve(application.routePackagePath())
      routeOutputDirectory.createDirectories()
      application.routes.forEach { route ->
        Files.writeString(
          routeOutputDirectory.resolve("${route.id}.kt"),
          route.toKotlinRouteObjectFile(application.id, application.routePackageName())
        )
      }
    }
}

private fun cleanGeneratedFiles(outputDirectory: Path) {
  Files.walk(outputDirectory).use { paths ->
    paths
      .sorted(Comparator.reverseOrder())
      .filter { it != outputDirectory }
      .forEach { path ->
        when {
          Files.isRegularFile(path) && path.fileName.toString().endsWith(".kt") -> Files.delete(path)
          Files.isDirectory(path) && path.isEmptyDirectory() -> Files.delete(path)
        }
      }
  }
}

private fun Path.isEmptyDirectory(): Boolean {
  return Files.list(this).use { files ->
    files.findAny().isEmpty
  }
}

private fun SpaApplicationDefinition.toKotlinRoutesObjectFile(): String {
  return buildString {
    appendGeneratedFileHeader(
      packageName = GENERATED_PACKAGE,
      imports = routes.map { route ->
        "${routePackageName()}.${route.id} as ${route.id}Route"
      }
    )
    appendLine("object ${routesObjectName()} {")
    routes.forEach { route ->
      appendLine("  val ${route.id} = ${route.id}Route")
    }
    appendLine("}")
  }
}

private fun SpaRouteDefinition.toKotlinRouteObjectFile(
  applicationId: String,
  packageName: String
): String {
  return buildString {
    appendGeneratedFileHeader(
      packageName = packageName,
      imports = buildList {
        add("com.caseymcguiredotcom.sparoutecontract.SpaRouteTarget")
        add("com.caseymcguiredotcom.sparoutecontract.SpaTypedRoute")
        if (parameters.any { it.type == SpaRouteParameterType.UUID }) {
          add("java.util.UUID")
        }
      }
    )

    appendLine("object $id : SpaTypedRoute(\"$applicationId\", \"$id\") {")
    if (parameters.isNotEmpty()) {
      appendLine("  operator fun invoke(${parameters.joinToString(", ") { it.toKotlinParameter() }}): SpaRouteTarget {")
      appendLine("    return target(${parameters.toKotlinParameterMap()})")
      appendLine("  }")
    }
    appendLine("}")
  }
}

private fun StringBuilder.appendGeneratedFileHeader(
  packageName: String,
  imports: List<String> = emptyList()
) {
  appendLine("package $packageName")
  appendLine()
  imports.forEach { import ->
    appendLine("import $import")
  }
  if (imports.isNotEmpty()) {
    appendLine()
  }
  appendLine("// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.")
  appendLine("// Run './gradlew generateServerSpaRoutes' to regenerate.")
  appendLine()
}

private fun SpaApplicationDefinition.routesObjectName(): String {
  return "${name.withoutWhitespace()}Routes"
}

private fun SpaApplicationDefinition.routePackageName(): String {
  return "$GENERATED_PACKAGE.${routePackagePath()}"
}

private fun SpaApplicationDefinition.routePackagePath(): String {
  return id.toPackageSegment()
}

private fun SpaRouteParameter.toKotlinParameter(): String {
  val typeName = when (type) {
    SpaRouteParameterType.STRING -> "String"
    SpaRouteParameterType.INT -> "Int"
    SpaRouteParameterType.UUID -> "UUID"
  }
  val nullableSuffix = if (optional) "?" else ""
  val defaultValue = if (optional) " = null" else ""
  return "${name.toKotlinIdentifier()}: $typeName$nullableSuffix$defaultValue"
}

private fun List<SpaRouteParameter>.toKotlinParameterMap(): String {
  if (all { !it.optional }) {
    return "mapOf(${joinToString(", ") { "\"${it.name}\" to ${it.name.toKotlinIdentifier()}.toString()" }})"
  }

  return buildString {
    appendLine("buildMap {")
    this@toKotlinParameterMap.forEach { parameter ->
      val identifier = parameter.name.toKotlinIdentifier()
      if (parameter.optional) {
        appendLine("        if ($identifier != null) {")
        appendLine("          put(\"${parameter.name}\", $identifier.toString())")
        appendLine("        }")
      } else {
        appendLine("        put(\"${parameter.name}\", $identifier.toString())")
      }
    }
    append("      }")
  }
}

private fun String.withoutWhitespace(): String {
  return replace("\\s+".toRegex(), "")
}

private fun String.toPackageSegment(): String {
  val sanitized = lowercase().replace("[^a-z0-9_]".toRegex(), "_")
  return if (sanitized.firstOrNull()?.isDigit() == true) {
    "_$sanitized"
  } else {
    sanitized
  }
}

private fun String.toKotlinIdentifier(): String {
  val sanitized = replace("[^A-Za-z0-9_]".toRegex(), "_")
  return if (sanitized.firstOrNull()?.isDigit() == true) {
    "_$sanitized"
  } else {
    sanitized
  }
}
