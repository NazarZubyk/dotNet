IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'MvcMovieDb')
BEGIN
    PRINT 'Creating database MvcMovieDb';
    CREATE DATABASE MvcMovieDb;
END