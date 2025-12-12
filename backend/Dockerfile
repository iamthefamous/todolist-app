# Multi-stage build for Spring Boot application

# Stage 1: Build the application
FROM gradle:8.5-jdk17 AS builder

WORKDIR /app

# Copy gradle files first for better caching
COPY build.gradle settings.gradle gradlew ./
COPY gradle gradle/

# Download dependencies (cached layer)
RUN gradle dependencies --no-daemon || true

# Copy source code
COPY src src/

# Build the application
RUN gradle clean build -x test --no-daemon

# Stage 2: Runtime image
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Create a non-root user
RUN addgroup -S spring && adduser -S spring -G spring

# Copy the built JAR from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Change ownership to non-root user
RUN chown -R spring:spring /app

# Switch to non-root user
USER spring:spring

# Expose the application port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/todos || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
