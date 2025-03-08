public class MoviesTest : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient _client

    public MoviesTest(CustomWebApplicationFactory<Program>){
        _client = factory.CreateClient()
    }
}