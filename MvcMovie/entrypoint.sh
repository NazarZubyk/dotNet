#!/bin/sh
set -e  # Exit on first error

# Wait for SQL Server to be ready
echo "Waiting for SQL Server to be ready..."
until nc -z -v -w30 sqlserver 1433; do
  echo "Database is not ready yet. Retrying in 5 seconds..."
  sleep 5
done

echo "Database is ready. Starting the application..."
exec dotnet MvcMovie.dll