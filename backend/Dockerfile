FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Add a non-root user (optional)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring

# Copy the jar
COPY build/libs/*.jar app.jar

# Set environment variable for Fly.io
ENV PORT=8080

# Tell Spring Boot to use the Fly.io port and listen on all interfaces
ENTRYPOINT ["java","-Dserver.address=0.0.0.0","-Dserver.port=${PORT}","-jar","app.jar"]
