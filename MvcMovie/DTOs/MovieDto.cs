using System.Text.Json.Serialization;
namespace MvcMovie.Dtos;

public class MovieDTO
{       
    [JsonPropertyName("movieGuid")]
    public Guid MovieGuid { get; set; } 

    [JsonPropertyName("title")]
    public string? Title { get; set; }

    [JsonPropertyName("releaseDate")]
    public DateTime ReleaseDate { get; set; }
    
    [JsonPropertyName("genre")]
    public string? Genre { get; set; }

    [JsonPropertyName("price")]
    public decimal Price { get; set; }
}