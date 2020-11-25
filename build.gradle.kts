import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import com.moowork.gradle.node.npm.NpmTask
import org.springframework.boot.gradle.tasks.run.BootRun

plugins {
    id("org.jetbrains.kotlin.jvm") version "1.3.41"
    id("org.springframework.boot") version "2.2.2.RELEASE"
    id("io.spring.dependency-management") version "1.0.6.RELEASE"
    id("com.github.node-gradle.node") version "2.2.1"
    id("nu.studer.jooq") version "5.2"
}

group = "com.kotlinspringgraphlreact"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")

    implementation(group = "com.expediagroup", name = "graphql-kotlin-schema-generator", version = "1.4.2")

    implementation(group = "com.graphql-java", name = "graphiql-spring-boot-starter", version = "5.0.2")

    implementation("org.jetbrains.kotlin:kotlin-reflect:1.3.0") // https://stackoverflow.com/a/47174551/11283051
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    // database and migrations
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    jooqGenerator("org.postgresql:postgresql:42.2.14")
    implementation("org.postgresql:postgresql:42.2.14")
    implementation("org.flywaydb:flyway-core:6.5.7")
}

val envVariables: Map<String, String> =  {
    val map = hashMapOf<String, String>()
    val envFile = file(".env")
    if (!envFile.exists()) {
        map
    }
    envFile.readLines().forEach {
        val (key, value) = it.split("=")
        map[key] = value
    }
    map
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
    dependsOn("npm_install", "webpack")
}

val dbUser = envVariables.getValue("DB_USER")
val dbPassword = envVariables.getValue("DB_PASSWORD")
val dbUrl = envVariables.getValue("DB_URL")


node {
    version = "12.16.0"
    npmVersion = "6.13.7"
    download = true
}

jooq {
    version.set("3.14.1")
    configurations {
        create("main") {
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
                        packageName = "com.caseymcguiredotcom.db.generated.jooq"
                        directory = "src/main/kotlin/com/caseymcguiredotcom/db"
                    }
                    database.apply {
                        inputSchema = "public"
                        excludes = "flyway_schema_history"
                    }
                }
            }
        }

    }
}