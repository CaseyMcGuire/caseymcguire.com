import com.github.gradle.node.npm.task.NpmTask
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.run.BootRun

val springVersion = "3.2.2"

plugins {
  id("org.jetbrains.kotlin.jvm") version "1.9.22"
  id("org.springframework.boot") version "3.2.2" // can't use variable here :(
  id("io.spring.dependency-management") version "1.1.4"
  id("com.github.node-gradle.node") version "3.4.0"
  id("nu.studer.jooq") version "5.2"
  id("org.flywaydb.flyway") version "9.16.0"
  id("com.netflix.dgs.codegen") version "6.1.4"
  id("java")
}

dependencyManagement {
  imports {
    mavenBom("com.netflix.graphql.dgs:graphql-dgs-platform-dependencies:latest.release")
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
  implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
  implementation("org.springframework.boot:spring-boot-starter-security")
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("com.netflix.graphql.dgs:graphql-dgs-spring-boot-starter")
  implementation("org.springframework.boot:spring-boot-starter-webflux")
  jooqGenerator("org.postgresql:postgresql:42.2.14")
  implementation("org.postgresql:postgresql:42.2.14")
  implementation("org.flywaydb:flyway-core:9.16.0")
  implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.1")
}

val herokuEnvironmentMap = mapOf(
  "JDBC_DATABASE_USERNAME" to "DB_USER",
  "JDBC_DATABASE_PASSWORD" to "DB_PASSWORD",
  "JDBC_DATABASE_URL" to "DB_URL"
)


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
  npmCommand.set(listOf("run", "relay"))
}

// make sure webpack runs before the processResources task so the TypeScript files are compiled before
// being copied into the build folder
tasks.processResources {
  dependsOn("webpack")
}

tasks.getByName<BootRun>("bootRun") {
  environment = envVariables
  dependsOn("herokuBuild")
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
// uncomment flyway dependency in plugins
// In order to clean database: ./gradlew flywayClean
// In order to rerun migrations: ./gradlew flywayMigrate
// NOTE: these configurations are only for running flyway from the command line, not from inside spring. Those are
// configured separately by Spring itself
// (https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html#spring.flyway.baseline-description)
//flyway {
//  url = dbUrl
//  user = dbUser
//  password = dbPassword
//}


node {
  version.set("20.11.0")
  npmVersion.set("10.4.0")
  download.set(true)
}

jooq {
  version.set("3.14.1")
  configurations {
    create("main") {
      generateSchemaSourceOnCompilation.set(false)
      jooqConfiguration.apply {
        jdbc.apply {
          driver = "org.postgresql.Driver"
          url = dbUrl
          user = dbUser
          password = dbPassword
        }
        generator.apply {
          name = "org.jooq.codegen.KotlinGenerator"
          target.apply {
            packageName = "generated.jooq"
            directory = "src/main/kotlin/com/caseymcguiredotcom/db"
          }
          database.apply {
            inputSchema = "public"
            excludes = "flyway_schema_history"
          }
          generate.apply {
            isImmutablePojos = true
          }
        }
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