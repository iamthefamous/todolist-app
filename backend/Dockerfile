FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

COPY gradlew gradlew
COPY gradle gradle
COPY build.gradle settings.gradle ./
COPY src src

RUN chmod +x gradlew && ./gradlew bootJar --no-daemon

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring

COPY --from=build /app/build/libs/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

USER spring

ENTRYPOINT ["java","-Dserver.address=0.0.0.0","-jar","app.jar"]
