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
            // Remove existing DbContext registration
            var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<MvcMovieContext>));
            if (descriptor != null)
            {
                services.Remove(descriptor);
            }

            

            // Add a new SQL Server database for testing
            services.AddDbContext<MvcMovieContext>(options =>
                options.UseSqlServer("Server=sqlserver,1433;Database=TestDb;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True"));

            // Apply migrations
            using var scope = services.BuildServiceProvider().CreateScope();
            var scopedServices = scope.ServiceProvider;
            var db = scopedServices.GetRequiredService<MvcMovieContext>();

            db.Database.EnsureDeleted();// Reset database for a clean state
            db.Database.Migrate();       // Apply latest migrations
        });
    }
}
