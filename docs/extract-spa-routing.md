# Extract `spa-routing` To A Reusable Project

This is a handoff guide for an agent extracting the current SPA routing framework into a separate reusable project.

## Goal

Move the reusable SPA routing contract and code generators out of this application repo so multiple projects can consume them as a normal dependency.

The extracted project should own the framework:

- route/application definition interfaces
- route parameter model and validation
- typed server route target helpers
- client route generator
- server route generator
- webpack bundle entry generator, if still generally useful
- discovery/validation utilities

This application repo should continue to own its concrete routes:

- `BlogSpaApplication`
- `WikiSpaApplication`
- `MovieSpaApplication`
- `WorkoutTrackerSpaApplication`
- `AiChatSpaApplication`
- application-specific rules, server config, GraphQL route-decision fetchers, and HTML rendering

## Current State

The reusable code currently lives in:

```txt
submodules/spa-routing/src/main/kotlin/com/caseymcguiredotcom/sparoutecontract
```

The project-specific route definitions have already been moved into this local module:

```txt
submodules/spa-route-definitions/src/main/kotlin/com/caseymcguiredotcom/sparoutecontract/applications
```

The root app depends on the local module:

```kotlin
implementation(project(":spa-routing"))
implementation(project(":spa-route-definitions"))
```

The root Gradle build runs the generators with the `:spa-route-definitions` runtime classpath and points discovery at the `applications` directory inside that module.

Important: `SpaApplicationDefinitionDiscovery` scans Kotlin source files to find application objects, but then loads those objects with `Class.forName`. That means the source directory and the compiled route definition classes must both be available when generator tasks run.

## Target Shape

Use a separate reusable project, preferably next to this repo while iterating:

```txt
../spa-routing
```

In this repo, add a small local route definitions module that contains only this site's static SPA route definitions:

```txt
submodules/spa-route-definitions
```

The dependency direction should be:

```txt
caseymcguiredotcom app
  -> spa-route-definitions
      -> external spa-routing dependency

caseymcguiredotcom app
  -> external spa-routing dependency
```

The generator tasks should depend on `:spa-route-definitions:classes` and should use the `:spa-route-definitions` runtime classpath. That runtime classpath will include both the concrete route definitions and the external generator/contract classes.

## Suggested Migration

1. Create the external project.

   Start with a single Kotlin JVM module. Do not create a Gradle plugin yet unless the extraction is already stable.

   ```txt
   spa-routing/
     build.gradle.kts
     settings.gradle.kts
     src/main/kotlin/...
   ```

2. Copy reusable code into the external project.

   Copy everything under `sparoutecontract` except the `applications` package.

   Keep the existing package names initially to reduce churn:

   ```kotlin
   package com.caseymcguiredotcom.sparoutecontract
   ```

   A package rename can happen later once the dependency boundary is proven.

3. Add publishing support to the external project.

   Minimum viable setup:

   ```kotlin
   plugins {
     kotlin("jvm") version "2.2.21"
     `maven-publish`
   }

   group = "com.caseymcguire"
   version = "0.1.0-SNAPSHOT"

   publishing {
     publications {
       create<MavenPublication>("maven") {
         from(components["java"])
       }
     }
   }
   ```

   Start with a composite build in this repo:

   ```kotlin
   includeBuild("../spa-routing")
   ```

   Publishing to `mavenLocal`, GitHub Packages, or Maven Central can come after the API settles.

4. Keep this repo's route definitions module local.

   This is already present:

   ```txt
   submodules/spa-route-definitions/build.gradle.kts
   submodules/spa-route-definitions/src/main/kotlin/...
   ```

   After `spa-routing` becomes an external dependency, update its `build.gradle.kts` to depend on the external library:

   ```kotlin
   dependencies {
     implementation("com.caseymcguire:spa-routing:0.1.0-SNAPSHOT")
   }
   ```

   With `includeBuild("../spa-routing")`, Gradle can substitute the local external project for that dependency.

5. Update this repo's root dependencies.

   Replace:

   ```kotlin
   implementation(project(":spa-routing"))
   ```

   with:

   ```kotlin
   implementation("com.caseymcguire:spa-routing:0.1.0-SNAPSHOT")
   implementation(project(":spa-route-definitions"))
   ```

   Keep `implementation(project(":spa-route-definitions"))` only if runtime server config directly imports the concrete application objects. It currently does.

6. Keep generator task classpaths pointed at the route definitions module.

   Do not use the external library's runtime classpath alone. The generator needs the compiled concrete route definitions too.

   The helper should remain pointed at `project(":spa-route-definitions")`:

   ```kotlin
   val spaApplicationSourceDir = project(":spa-route-definitions")
     .layout
     .projectDirectory
     .dir("src/main/kotlin/com/caseymcguiredotcom/sparoutecontract/applications")
     .asFile
     .absolutePath

   fun spaRouteDefinitionsRuntimeClasspath() = project(":spa-route-definitions")
     .extensions
     .getByType<SourceSetContainer>()
     .named("main")
     .get()
     .runtimeClasspath
   ```

   Then each generator task should use:

   ```kotlin
   dependsOn(":spa-route-definitions:classes")
   classpath = spaRouteDefinitionsRuntimeClasspath()
   ```

7. Remove the old local `spa-routing` submodule.

   After the new external dependency and local route definitions module work, delete:

   ```txt
   submodules/spa-routing
   ```

   The `settings.gradle.kts` helper auto-includes submodules with `build.gradle.kts`, so the new `spa-route-definitions` module should be picked up automatically.

8. Make generator package names configurable.

   `GenerateServerRoutes` currently hardcodes:

   ```kotlin
   com.caseymcguiredotcom.generated.spa.routes
   ```

   That is fine inside this app but not fine in a reusable dependency. Add a system property such as:

   ```txt
   route.server.package
   ```

   Use the current package as the default to avoid breaking this repo during extraction.

9. Decide what to do with `uuid()`.

   Do not let this block the extraction. The current system has `UUID` support, but URL params probably only need `string()` and `int()`. If simplifying, remove `UUID` in a separate commit before or after extraction, not mixed into the dependency move.

10. Defer the Gradle plugin.

   The long-term API probably wants:

   ```kotlin
   plugins {
     id("com.caseymcguire.spa-routing") version "0.1.0"
   }

   spaRouting {
     definitionsProject.set(project(":spa-route-definitions"))
     clientRoutesOutputDir.set(layout.projectDirectory.dir("src/main/web-frontend/__generated__/routes"))
     serverRoutesOutputDir.set(layout.buildDirectory.dir("generated/source/spaRoutes/main"))
     serverRoutesPackage.set("com.caseymcguiredotcom.generated.spa.routes")
   }
   ```

   But first extract the jar and keep the existing explicit `JavaExec` tasks. That gives a smaller, easier-to-debug change.

## Validation

Run these from this repo after the migration:

```sh
./gradlew clean build generateClientRoutes generateWebpackBundleEntries
npm run typecheck
git diff --check
```

Also verify the generated outputs still land in the same places:

```txt
src/main/web-frontend/__generated__/routes/*.ts
build/generated/source/spaRoutes/main/com/caseymcguiredotcom/generated/spa/routes/**/*.kt
SinglePageApplicationBundles.ts
```

## Success Criteria

- This repo no longer has a `submodules/spa-routing` framework module.
- This repo has only project-specific SPA route definitions locally.
- The app builds using an external `com.caseymcguire:spa-routing` dependency.
- Generator tasks still produce identical or intentionally changed output.
- Server configs can still reference concrete app definitions and generated typed server routes.
- Client route builders still typecheck.

## Common Pitfalls

- Do not put this app's concrete `*SpaApplication` objects in the external project.
- Do not point the generator classpath only at the external library. Discovery needs compiled concrete route definition objects.
- Do not move route definitions into the app's main source set unless the compile/codegen ordering is redesigned. That creates a likely cycle because generated server routes are added to main compilation.
- Do not introduce a Gradle plugin and package rename in the same change unless necessary. Keep the extraction mechanically small first.
- Do not commit generated output changes unless they are expected and reviewed.
