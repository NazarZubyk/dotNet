using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Models;
using Xunit.Abstractions;

namespace MvcMovie.IntegrationTests.Tests
{
    public class MovieResponse
    {
        public required Movie Movie { get; set; }
    }

    public class MoviesResponse
    {
        public required List<Movie> Movie { get; set; }
    }


    public class BasicTests 
        : IClassFixture<CustomWebApplicationFactory>
    {
        
        private readonly HttpClient _client;
        private readonly ITestOutputHelper _output;

        public BasicTests(CustomWebApplicationFactory factory,  ITestOutputHelper output)
        {
            _client = factory.CreateClient();
            _output = output;
        }


        [Fact]
        public async Task Get_MovieIntegrationTest (){
            var response = await _client.GetAsync("/apiV1/Movies");

            response.EnsureSuccessStatusCode();
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Post_MovieIntegrationTest(){
            var testMovie = new Movie
                {
                    Title = "title",
                    ReleaseDate = DateTime.Parse("2011-03-02"), 
                    Genre = "some genre",
                    Price = 10.0m 
                };
            
            var jsonContent = new StringContent(
                JsonSerializer.Serialize(testMovie),
                Encoding.UTF8,
                "application/json"
            );


            var response = await _client.PostAsync("/apiV1/Movies", jsonContent);


            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            var createdMovie = JsonSerializer.Deserialize<MovieResponse>(responseString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                    



            // Verify the created movie matches input data
            Assert.NotNull(createdMovie);
            Assert.Equal(testMovie.Title, createdMovie.Movie.Title);
            Assert.Equal(testMovie.ReleaseDate, createdMovie.Movie.ReleaseDate);
            Assert.Equal(testMovie.Genre, createdMovie.Movie.Genre);
            Assert.Equal(testMovie.Price, createdMovie.Movie.Price);

            

            var getResponse = await _client.GetAsync($"/apiV1/Movies?id={createdMovie.Movie.Id}");
            getResponse.EnsureSuccessStatusCode();
            
            

            // Deserialize GET response
            var getResponseString = await getResponse.Content.ReadAsStringAsync();
            _output.WriteLine($"Created Movie: {getResponseString}");
            var fetchedMovie = JsonSerializer.Deserialize<MoviesResponse>(getResponseString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            // Assert - Verify the fetched movie matches the input data
            Assert.NotNull(fetchedMovie);
            Assert.Equal(testMovie.Title, fetchedMovie.Movie[0].Title);
            Assert.Equal(testMovie.ReleaseDate, fetchedMovie.Movie[0].ReleaseDate);
            Assert.Equal(testMovie.Genre, fetchedMovie.Movie[0].Genre);
            Assert.Equal(testMovie.Price, fetchedMovie.Movie[0].Price);
        }

        [Fact]
        public async Task Delete_MovieIntegrationTest(){
             var testMovie = new Movie
                {
                    Title = "title",
                    ReleaseDate = DateTime.Parse("2011-03-02"), 
                    Genre = "some genre",
                    Price = 10.0m 
                };
            
            var jsonContent = new StringContent(
                JsonSerializer.Serialize(testMovie),
                Encoding.UTF8,
                "application/json"
            );


            var response = await _client.PostAsync("/apiV1/Movies", jsonContent);

            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            var createdMovie = JsonSerializer.Deserialize<MovieResponse>(responseString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            Assert.NotNull(createdMovie);
            Assert.NotNull(createdMovie.Movie);

            var deleteJsonContent = new StringContent(
                JsonSerializer.Serialize(createdMovie.Movie),
                Encoding.UTF8,
                "application/json"
            );

            var deleteRequest = new HttpRequestMessage(HttpMethod.Delete, "/apiV1/Movies")
            {
                Content = deleteJsonContent
            };

            var deleteResponse = await _client.SendAsync(deleteRequest);
            deleteResponse.EnsureSuccessStatusCode();  

            
            var getResponse = await _client.GetAsync($"/apiV1/Movies/{createdMovie.Movie.Id}");
            Assert.False(getResponse.IsSuccessStatusCode); 

            Assert.Equal(System.Net.HttpStatusCode.NotFound, getResponse.StatusCode);
        }
    }
}