#!/bin/sh
set -e

echo "Waiting for SQL Server to start..."
sleep 10  # Give the database time to initialize

echo "Applying database migrations..."
dotnet ef database update --connection "Server=sqlserver,1433;Database=MvcMovieDb;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True;"

echo "Starting the backend server..."
exec dotnet MvcMovie.dll
