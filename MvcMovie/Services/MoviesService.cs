
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Data;
using MvcMovie.Dtos;
using MvcMovie.Models;
using NuGet.Protocol;

namespace MvcMovie.Services{

    public interface IMoviesService
    {
        Task<IActionResult> GetMovies();
        Task<IActionResult> GetMoviesByGuid(Guid guid);
        Task<IActionResult> PostMovies(MovieDTO newMovie);
        Task<IActionResult> PutMovies( MovieDTO updatedMovie);
        Task<IActionResult> DeleteMoviesByGuid(Guid guid);
    }

    public class MoviesService: IMoviesService{
        private readonly MvcMovieContext _context;
        private readonly IMapper _mapper;

        public MoviesService(MvcMovieContext context, IMapper mapper){
            _context = context;
            _mapper = mapper;
        }

        public async Task<IActionResult>  GetMovies(){
           var movies = await  _context.Movie.ToListAsync();
           var movieDTOs = _mapper.Map<List<MovieDTO>>(movies);
           return new JsonResult(
            new{
                movies = movieDTOs
            }
           );

        }

        public async Task<IActionResult>  GetMoviesByGuid(Guid guid){
           var movie = await  _context.Movie.Where(m=>m.MovieGuid == guid).FirstOrDefaultAsync();
            if (movie == null)
            {
                return new  NotFoundResult();
            }
           return new JsonResult(
            new{
                movie
            }
           );

        }

        public async Task<IActionResult>  PostMovies(MovieDTO newMovie){
           var  movie = _mapper.Map<Movie>(newMovie);
           movie.MovieGuid = Guid.NewGuid();
           var movieEntry = await  _context.Movie.AddAsync(movie);
           await _context.SaveChangesAsync();
           return new JsonResult(
            new{
                movie = movieEntry.Entity
            }
           );

        }

        public async Task<IActionResult>  PutMovies( MovieDTO updatedMovie){
            var movie = await _context.Movie.FirstOrDefaultAsync(m => m.MovieGuid == updatedMovie.MovieGuid);
            
            if (movie == null)
            {
                return new NotFoundResult();
            }

            _mapper.Map(updatedMovie, movie);

            await _context.SaveChangesAsync();

            return new JsonResult(new { movie });

        }

        public async Task<IActionResult>  DeleteMoviesByGuid(Guid guid){
            System.Console.WriteLine(guid);
           var movie = await  _context.Movie.Where(m=>m.MovieGuid == guid).FirstOrDefaultAsync();

            if(movie == null){
                return new NotFoundResult();
            }

           _context.Movie.Remove(movie);
           await _context.SaveChangesAsync();

           return new JsonResult(
            new{
                movie
            }
           );

        }

    }

    

}