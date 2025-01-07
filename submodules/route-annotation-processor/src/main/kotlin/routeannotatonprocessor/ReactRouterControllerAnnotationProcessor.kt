package routeannotatonprocessor

import com.google.auto.service.AutoService
import java.io.File
import javax.annotation.processing.AbstractProcessor
import javax.annotation.processing.Processor
import javax.annotation.processing.RoundEnvironment
import javax.annotation.processing.SupportedAnnotationTypes
import javax.annotation.processing.SupportedSourceVersion
import javax.lang.model.SourceVersion
import javax.lang.model.element.TypeElement


@AutoService(Processor::class)
@SupportedAnnotationTypes(
  "routeannotatonprocessor.ReactRouterGetMapping",
  "routeannotatonprocessor.ReactRouterController"
)
@SupportedSourceVersion(SourceVersion.RELEASE_17)
class ReactRouterControllerAnnotationProcessor : AbstractProcessor() {
  override fun process(annotations: Set<TypeElement>, roundEnv: RoundEnvironment): Boolean {
    val routesByGroup = mutableMapOf<String, MutableList<ReactRouterRoute>>()

    roundEnv.getElementsAnnotatedWith(ReactRouterGetMapping::class.java).forEach { element ->

      val classElement = element.enclosingElement as TypeElement
      val group = classElement.getAnnotation(ReactRouterController::class.java)
      val groupName = group?.value ?: "default"

      val mapping = element.getAnnotation(ReactRouterGetMapping::class.java)

      routesByGroup.getOrPut(groupName) { mutableListOf() }
        .addAll(mapping.routes)
    }

    // Generate TypeScript files
    generateTypeScriptFiles(routesByGroup)
    return true
  }

  private fun generateTypeScriptFiles(routesByGroup: Map<String, List<ReactRouterRoute>>) {
    routesByGroup.entries.forEach { entry ->
      val typescriptFile = StringBuilder()
        .append("/** GENERATED FILE - DO NOT MODIFY */\n\n")
        .append("const ${entry.key}Routes = {\n")

      entry.value.forEach {
        typescriptFile.append("  ${it.name} : \"${RouteConverter.convertSpringToReactRouter(it.path)}\",\n")
      }

      typescriptFile.append("}\n\n")
        .append("export default ${entry.key}Routes;")

      File("src/main/web-frontend/router/__generated__/${entry.key}Routes.ts").apply {
        parentFile.mkdirs()
        writeText(typescriptFile.toString())
      }
    }

    // Implementation of TypeScript generation
  }
}


