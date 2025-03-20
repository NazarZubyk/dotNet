using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Data;
using MvcMovie.Dtos;
using MvcMovie.Models;
using MvcMovie.Services;
using NuGet.Protocol;

namespace MvcMovie.Controllers
{
    [Route("apiV1/Movies")]
    public class MoviesController : Controller
    {
        private readonly IMoviesService _moviesService;

        public MoviesController(IMoviesService moviesService)
        {
            _moviesService = moviesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMovies([FromQuery] Guid? guid){
            if (guid.HasValue)
            {
                return await _moviesService.GetMoviesByGuid(guid.Value);
            }
            else
            {
                return await _moviesService.GetMovies();
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostMovie([FromBody] MovieDTO movie){
            if (!ModelState.IsValid)
            {
                return new BadRequestResult();
            }
            return await _moviesService.PostMovies(movie);
        }

        [HttpPut]
        public async Task<IActionResult>PutMovieById([FromBody] MovieDTO movie){
            if (!ModelState.IsValid)
            {
                return new BadRequestResult();
            }

            return await _moviesService.PutMovies(movie);

        }

        [HttpDelete]
        public async Task<IActionResult> DeleteMovieByGuid([FromBody] MovieDTO movie){
            if (!ModelState.IsValid)
            {
                return new BadRequestResult();
            }
            return await _moviesService.DeleteMoviesByGuid(movie.MovieGuid);
        }


    }
}
