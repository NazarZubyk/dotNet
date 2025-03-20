# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

RUN apt-get update && apt-get install -y libcrypt1

# Copy solution and restore dependencies
COPY MvcMovie/*.csproj MvcMovie/
COPY *.csproj MvcMovie/
RUN dotnet restore MvcMovie/MvcMovie.csproj

# Copy and build the application
COPY MvcMovie/. MvcMovie/
WORKDIR /src/MvcMovie

RUN dotnet publish -c Release -o /publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /publish .

RUN apt-get update && apt-get install -y netcat-openbsd

# Copy a simplified entrypoint script
COPY MvcMovie/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["sh","/entrypoint.sh"]



