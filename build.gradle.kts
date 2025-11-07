import com.github.gradle.node.npm.task.NpmTask
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.run.BootRun

val springVersion = "3.2.9"
val jooqVersion = "3.19.16"
val postgresVersion = "42.7.2"
val exposedVersion = "1.0.0-beta-2"
val migrationScriptPath = "com.caseymcguiredotcom.scripts.GenerateMigrationScriptKt"

plugins {
  id("org.jetbrains.kotlin.jvm") version "2.0.0"
  // Kotlin makes all classes final by default but Spring relies
  // upon classes being extendable to implement certain functionality.
  // In my case, Spring Security's `@PreAuthorize` annotation wasn't working
  // but when I marked the class as `open`, dependency injection wouldn't work.
  // However, this plugin seems to fix both issues.
  // Read here for more info: https://kotlinlang.org/docs/all-open-plugin.html
  id("org.jetbrains.kotlin.plugin.spring") version "2.0.0"
  id("org.springframework.boot") version "3.2.9" // can't use variable here :(
  id("io.spring.dependency-management") version "1.1.7"
  id("com.github.node-gradle.node") version "7.1.0"
  id("org.jooq.jooq-codegen-gradle") version "3.19.16"
  id("org.flywaydb.flyway") version "9.16.0"
  id("com.netflix.dgs.codegen") version "8.1.1"
  id("java")
}

dependencyManagement {
  imports {
    mavenBom("com.netflix.graphql.dgs:graphql-dgs-platform-dependencies:9.2.2")
    mavenBom("org.springframework.boot:spring-boot-dependencies:${springVersion}")
  }
}

group = "com.caseymcguiredotcom"
version = "1.0-SNAPSHOT"

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.springframework.boot:spring-boot-starter-security")
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("com.netflix.graphql.dgs:graphql-dgs-spring-boot-starter")
  implementation("org.springframework.boot:spring-boot-starter-webflux")

  // for application runtime
  implementation("org.jooq:jooq:$jooqVersion")
  implementation("org.jooq:jooq-meta:$jooqVersion")
  implementation("org.jooq:jooq-codegen:$jooqVersion")

  // This ensures these libraries will be on the classpath for the jooqCodegen gradle task
  jooqCodegen("org.jooq:jooq-codegen:$jooqVersion")
  jooqCodegen("org.jooq:jooq-meta:$jooqVersion")
  jooqCodegen("org.postgresql:postgresql:$postgresVersion")
  jooqCodegen(project(":customgenerator"))

  implementation("org.jetbrains.exposed:exposed-core:$exposedVersion")
  implementation("org.jetbrains.exposed:exposed-jdbc:$exposedVersion")
  implementation("org.jetbrains.exposed:spring-transaction:$exposedVersion")
  implementation("org.jetbrains.exposed:exposed-migration:$exposedVersion")
  implementation("org.jetbrains.exposed:exposed-java-time:$exposedVersion")
  implementation("org.postgresql:postgresql:$postgresVersion")
  implementation("org.flywaydb:flyway-core:9.16.0")
  implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.1")
  implementation("org.jetbrains.kotlinx:kotlinx-html-jvm:0.8.0")

  implementation("io.github.classgraph:classgraph:4.8.179")
}

val herokuEnvironmentMap = mapOf(
  "JDBC_DATABASE_USERNAME" to "DB_USER",
  "JDBC_DATABASE_PASSWORD" to "DB_PASSWORD",
  "JDBC_DATABASE_URL" to "DB_URL"
)

springBoot {
  mainClass.set("com.caseymcguiredotcom.ApplicationKt")
}


val envVariables: Map<String, String> = {
  val getEnvironmentVariables = fun(): Map<String, String> {
    val map = hashMapOf<String, String>()

    herokuEnvironmentMap.entries.forEach {
      val herokuEnvName = it.key
      val appEnvName = it.value
      val envValue = System.getenv()[herokuEnvName]
      if (envValue != null) {
        map[appEnvName] = envValue
      }
    }

    val envFile = file(".env")
    if (!envFile.exists()) {
      return map
    }
    envFile.readLines().forEach {
      val (key, value) = it.split("=")
      map[key] = value
    }
    return map
  }
  getEnvironmentVariables()
}()

// if you change this, you must update the `java.runtime.version` param in the 'system.properties' file to the same value
val javaVersion = "17"

tasks.withType<KotlinCompile> {
  kotlinOptions {
    jvmTarget = javaVersion
  }
}

tasks.withType<JavaCompile> {
  sourceCompatibility = javaVersion
  targetCompatibility = javaVersion
}

tasks.register("webpack", NpmTask::class) {
  npmCommand.set(listOf("run", "webpack"))
}

tasks.register("webpackDevelopment", NpmTask::class) {
  npmCommand.set(listOf("run", "webpack-development"))
}

tasks.register<NpmTask>("buildRelay") {
  npmCommand.set(listOf("run", "relay-compiler"))
}

// make sure webpack runs before the processResources task so the TypeScript files are compiled before
// being copied into the build folder
tasks.processResources {
  val taskNames = gradle.startParameter.taskNames
  // only run frontend tasks when we're doing a full build
  if (taskNames.any { it.contains("bootRun", ignoreCase = true) }) {
    dependsOn("npm_install", "webpack")
  }
}

tasks.getByName<BootRun>("bootRun") {
  environment = envVariables
  dependsOn("herokuBuild")
}

tasks.register<JavaExec>("generateMigrationScript") {
  description = "Generates a SQL migration script which can be used by Flyway."
  // This tells Gradle to use the project's compiled classes and all its dependencies
  classpath = sourceSets.main.get().runtimeClasspath
  environment = envVariables
  mainClass.set(migrationScriptPath)
}

// For reasons I don't understand, adding this task causes Gradle to bug-out
/*tasks.register("foo") {
  tasks.findByName("bootRun")?.mustRunAfter("webpack")
  tasks.findByName("webpack")?.mustRunAfter("npm_install")
  dependsOn("bootRun", "webpack", "npm_install")
}*/

tasks.register("herokuBuild") {
  val taskList = listOf("build", "npm_install")
  taskList.forEachIndexed { index, task ->
    if (index < taskList.size - 1) {
      tasks.findByName(task)?.mustRunAfter(taskList[index + 1])
    }
  }
  dependsOn(taskList)
}

val dbUser = envVariables.getValue("DB_USER")
val dbPassword = envVariables.getValue("DB_PASSWORD")
val dbUrl = envVariables.getValue("DB_URL")

// How to run flyway commands in command line
// In order to clean database: ./gradlew flywayClean
// In order to rerun migrations: ./gradlew flywayMigrate
// NOTE: these configurations are only for running flyway from the command line, not from inside spring. Those are
// configured separately by Spring itself
// (https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html#spring.flyway.baseline-description)
flyway {
  url = dbUrl
  user = dbUser
  password = dbPassword
}


node {
  version.set("20.11.0")
  npmVersion.set("10.4.0")
  download.set(true)
}

jooq {
  configuration {
        jdbc {
          driver = "org.postgresql.Driver"
          url = dbUrl
          user = dbUser
          password = dbPassword
        }
        generator {
          name = "org.jooq.codegen.KotlinGenerator"
          target {
            packageName = "generated.jooq"
            directory = "src/main/kotlin/com/caseymcguiredotcom/db/codegen"
          }
          database {
            inputSchema = "public"
            excludes = "flyway_schema_history"
          }
          generate {
            isImmutablePojos = true
          }
         strategy {
           // Note: In order for this to work, this class must be in a different gradle project and the gradle project
           // must be included as a dependency of the jooqCodegen gradle task (see above in 'dependencies' block).
           // See https://github.com/etiennestuder/gradle-jooq-plugin/blob/ac7f25ada8c8a15b0e3692ef038f6dd0fd6a42ac/example/configure_custom_generator_strategy/build.gradle#L12
           name = "com.caseymcguiredotcom.CustomGeneratorStrategy"
          }
        }
  }

}

tasks.withType<com.netflix.graphql.dgs.codegen.gradle.GenerateJavaTask> {
  schemaPaths = mutableListOf("${projectDir}/src/main/resources/schema")
  generateClient = true
  packageName = "com.caseymcguiredotcom.codegen.graphql"
}

// Prevent the -plain jar from being created because it doesn't contain a manifest file
// Since Heroku attempts to run all jar in 'build/libs', the build was failing.
tasks.getByName<Jar>("jar") {
  enabled = false
}