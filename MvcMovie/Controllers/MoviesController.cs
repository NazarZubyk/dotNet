using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Data;
using MvcMovie.Models;
using MvcMovie.Services;

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
        public async Task<IActionResult> GetMovies([FromQuery] int? id){
            if (id.HasValue)
            {
                return await _moviesService.GetMoviesById(id.Value);
            }
            else
            {
                return await _moviesService.GetMovies();
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostMovie([FromBody] Movie movie){
            if (!ModelState.IsValid)
            {
                return new BadRequestResult();
            }
            return await _moviesService.PostMovies(movie);
        }

        [HttpPut]
        public async Task<IActionResult>PutMovieById([FromBody] Movie movie){
            if (!ModelState.IsValid)
            {
                return new BadRequestResult();
            }

            return await _moviesService.PutMovies(movie);

        }

        [HttpDelete]
        public async Task<IActionResult> DeleteMovieById([FromBody] Movie movie){
            return await _moviesService.DeleteMoviesById(movie.Id);
        }


    }
}
