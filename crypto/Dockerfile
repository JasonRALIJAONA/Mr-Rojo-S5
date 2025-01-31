# Multi-stage build for Spring Boot application
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy the Maven build file and the source code to the container
COPY crypto/pom.xml /app
COPY crypto/src /app/src

# Package the application while skipping tests
RUN mvn -f /app/pom.xml clean package -DskipTests

# Use a lightweight OpenJDK image for the final container
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the packaged .war file from the builder stage
COPY --from=builder /app/target/crypto-0.0.1-SNAPSHOT.war /app/crypto.war

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "/app/crypto.war"]
