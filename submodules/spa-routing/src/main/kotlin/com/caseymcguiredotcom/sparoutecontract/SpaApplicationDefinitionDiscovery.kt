package com.caseymcguiredotcom.sparoutecontract

import java.nio.file.Files
import java.nio.file.Path

object SpaApplicationDefinitionDiscovery {
  fun discover(sourceDirectory: Path): List<SpaApplicationDefinition> {
    require(Files.isDirectory(sourceDirectory)) {
      "SPA application source directory does not exist: $sourceDirectory"
    }

    val applications = Files.walk(sourceDirectory).use { paths ->
      paths
        .filter { Files.isRegularFile(it) }
        .filter { it.fileName.toString().endsWith(".kt") }
        .flatMap { path -> path.discoverApplications().stream() }
        .toList()
    }

    require(applications.isNotEmpty()) {
      "No SPA application definitions found in $sourceDirectory"
    }

    SpaApplicationDefinitionValidator.validate(applications)
    return applications
  }

  fun discoverFromSystemProperty(): List<SpaApplicationDefinition> {
    val sourceDirectoryPath = System.getProperty(SOURCE_DIRECTORY_PROPERTY)
      ?: throw IllegalArgumentException("'$SOURCE_DIRECTORY_PROPERTY' must be set in task config")
    return discover(Path.of(sourceDirectoryPath))
  }

  private fun Path.discoverApplications(): List<SpaApplicationDefinition> {
    val source = Files.readString(this)
    val objectNames = APPLICATION_OBJECT_PATTERN.findAll(source)
      .filter { match -> match.groupValues[2].contains("SpaApplicationDefinition") }
      .map { match -> match.groupValues[1] }
      .toList()

    if (objectNames.isEmpty()) {
      return emptyList()
    }

    val packageName = PACKAGE_PATTERN.find(source)?.groupValues?.get(1)
      ?: throw IllegalArgumentException("SPA application definition file must declare a package: $this")

    return objectNames.map { objectName ->
      loadApplicationDefinition("$packageName.$objectName")
    }
  }

  private fun loadApplicationDefinition(className: String): SpaApplicationDefinition {
    val instance = Class.forName(className)
      .getField("INSTANCE")
      .get(null)

    require(instance is SpaApplicationDefinition) {
      "$className must implement ${SpaApplicationDefinition::class.java.name}"
    }

    return instance
  }

  private const val SOURCE_DIRECTORY_PROPERTY = "spa.application.source.dir"
  private val PACKAGE_PATTERN = Regex("""(?m)^\s*package\s+([A-Za-z_][A-Za-z0-9_.]*)\s*$""")
  private val APPLICATION_OBJECT_PATTERN = Regex(
    """object\s+([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([^{]+)\{""",
    setOf(RegexOption.MULTILINE, RegexOption.DOT_MATCHES_ALL)
  )
}
