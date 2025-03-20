using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MvcMovie.Data;
using System;
using System.Linq;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Remove existing DbContext registration to avoid conflicts
            var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<MvcMovieContext>));
            if (descriptor != null)
            {
                services.Remove(descriptor);
            }

            // Register In-Memory Database for testing
            services.AddDbContext<MvcMovieContext>(options =>
                options.UseInMemoryDatabase("TestingDb"));
            
            // Create and seed the database
            using var scope = services.BuildServiceProvider().CreateScope();
            var scopedServices = scope.ServiceProvider;
            var db = scopedServices.GetRequiredService<MvcMovieContext>();

            db.Database.EnsureDeleted(); // Reset database for a clean state
            db.Database.EnsureCreated(); // Create database schema

            // Seed test data here if needed
            // SeedData.Initialize(db);
        });
    }
}
