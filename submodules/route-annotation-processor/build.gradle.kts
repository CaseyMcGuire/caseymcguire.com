import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.9.22"
    kotlin("kapt") version "1.9.22"
}

group = "com.caseymcguiredotcom"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    compileOnly("com.google.auto.service:auto-service-annotations:1.0.1")
    kapt("com.google.auto.service:auto-service:1.0.1")
    implementation("org.springframework.boot:spring-boot-starter-web:3.2.2")
    implementation("javax.annotation:javax.annotation-api:1.3.2")
}

val javaVersion = "17"

tasks.withType<KotlinCompile> {
    kotlinOptions {
        jvmTarget = javaVersion
    }
}

kotlin {
    jvmToolchain(17)
}

tasks.test {
    useJUnitPlatform()
}