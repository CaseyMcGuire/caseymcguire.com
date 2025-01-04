rootProject.name = "caseymcguiredotcom"
include("customgenerator")

fun includeSubmodulesFromDirectory(directoryName: String) {
  val submodulesDir = file(directoryName)
  if (submodulesDir.exists() && submodulesDir.isDirectory) {
    submodulesDir.listFiles()?.forEach { dir ->
      if (dir.isDirectory && File(dir, "build.gradle.kts").exists()) {
        val moduleName = dir.name
        include(moduleName)
        project(":$moduleName").projectDir = dir
      }
    }
  } else {
    println("Directory '$directoryName' does not exist or is not a directory.")
  }
}

includeSubmodulesFromDirectory("submodules")