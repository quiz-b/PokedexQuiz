FROM maven:3-eclipse-temurin-17 AS build
WORKDIR /workspace
COPY . .
RUN mvn clean package -Dmaven.test.skip=true

FROM eclipse-temurin:17-alpine
WORKDIR /app
COPY --from=build /workspace/target/SpringStart08-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]