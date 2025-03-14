# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy solution and restore dependencies
COPY *.sln ./
COPY MvcMovie/*.csproj MvcMovie/
RUN dotnet restore MvcMovie/MvcMovie.csproj

# Copy and build the application
COPY MvcMovie/. MvcMovie/
WORKDIR /app/MvcMovie
RUN dotnet publish -c Release -o /publish

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /publish .
CMD ["dotnet", "MvcMovie.dll"]




