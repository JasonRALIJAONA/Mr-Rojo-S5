# Multi-stage build for Spring Boot application
FROM maven:3.8.6-openjdk-17 AS builder
WORKDIR /app

# Copy the Maven build file and the source code to the container
COPY crypto/pom.xml /app
COPY crypto/src /app/src

# Package the application
RUN mvn -f /app/pom.xml clean package

# Multi-stage build for .NET application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY fournisseurIdentite/fournisseurIdentite.csproj fournisseurIdentite/
RUN dotnet restore "fournisseurIdentite/fournisseurIdentite.csproj"
COPY . .
WORKDIR "/src/fournisseurIdentite"
RUN dotnet build "fournisseurIdentite.csproj" -c Release -o /app/build
RUN dotnet publish "fournisseurIdentite.csproj" -c Release -o /app/publish

# Final stage for running both applications
FROM openjdk:17-jdk-alpine AS springboot
WORKDIR /app
COPY --from=builder /app/target/crypto-0.0.1-SNAPSHOT.war /app/crypto.war

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS dotnet
WORKDIR /app
COPY --from=build /app/publish .

# Expose ports for both applications
EXPOSE 8080 80

# Run both applications
CMD ["sh", "-c", "java -jar /app/crypto.war & dotnet fournisseurIdentite.dll"]