import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import com.moowork.gradle.node.npm.NpmTask
import org.springframework.boot.gradle.tasks.run.BootRun

plugins {
  id("org.jetbrains.kotlin.jvm") version "1.3.41"
  id("org.springframework.boot") version "2.2.2.RELEASE"
  id("io.spring.dependency-management") version "1.0.6.RELEASE"
  id("com.github.node-gradle.node") version "2.2.1"
  id("nu.studer.jooq") version "5.2"
  //id("org.flywaydb.flyway") version "7.3.0"
}

group = "com.kotlinspringgraphlreact"
version = "1.0-SNAPSHOT"

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
  implementation(group = "org.springframework.boot", name = "spring-boot-starter-security", version = "2.4.0")

  implementation(group = "com.expediagroup", name = "graphql-kotlin-schema-generator", version = "1.4.2")

  implementation(group = "com.graphql-java-kickstart", name = "graphiql-spring-boot-starter", version = "8.1.0")

  implementation("org.jetbrains.kotlin:kotlin-reflect:1.3.0") // https://stackoverflow.com/a/47174551/11283051
  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

  // database and migrations
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  jooqGenerator("org.postgresql:postgresql:42.2.14")
  implementation("org.postgresql:postgresql:42.2.14")
  implementation("org.flywaydb:flyway-core:6.5.7")
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

tasks.withType<KotlinCompile> {
  kotlinOptions {
    jvmTarget = "1.8"
  }
}

tasks.register("webpack", NpmTask::class) {
  setNpmCommand("run", "webpack")
}

tasks.register("webpackDevelopment", NpmTask::class) {
  setNpmCommand("run", "webpack-development")
}

tasks.register("buildRelay", NpmTask::class) {
  setNpmCommand("run", "compile-relay")
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
  val taskList = listOf("build", "webpack", "npm_install")
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
  version = "12.16.0"
  npmVersion = "7.6.3"
  download = true
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