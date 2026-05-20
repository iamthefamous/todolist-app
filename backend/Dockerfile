FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon || true

COPY src src

RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

RUN apk add --no-cache busybox-extras
RUN addgroup -S spring && adduser -S spring -G spring

COPY --from=build /app/build/libs/*.jar app.jar
COPY wait-for-mysql.sh /app/wait-for-mysql.sh

RUN chmod +x /app/wait-for-mysql.sh && chown spring:spring /app/wait-for-mysql.sh app.jar

USER spring

EXPOSE 8080

ENTRYPOINT ["/app/wait-for-mysql.sh"]
