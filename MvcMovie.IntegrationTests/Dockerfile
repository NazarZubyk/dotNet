FROM mcr.microsoft.com/dotnet/sdk:9.0 AS test
WORKDIR /app

# Copy solution and restore dependencies
COPY *.sln ./
COPY MvcMovie/*.csproj MvcMovie/
COPY MvcMovie.IntegrationTests/*.csproj MvcMovie.IntegrationTests/
RUN dotnet restore MvcMovie.IntegrationTests/MvcMovie.IntegrationTests.csproj

# Copy test project and build it
COPY MvcMovie/. MvcMovie/
COPY MvcMovie.IntegrationTests/. MvcMovie.IntegrationTests/
WORKDIR /app/MvcMovie.IntegrationTests
RUN dotnet build -c Release

# Build the solution in Release mode (to match the production environment)
RUN dotnet build -c Release

# Run tests (replace `your_test_dll` with actual test DLL name)
CMD ["dotnet", "test", "--logger", "trx"]
