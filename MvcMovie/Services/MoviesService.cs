
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Data;
using MvcMovie.Models;
using NuGet.Protocol;

namespace MvcMovie.Services{

    public interface IMoviesService
    {
        Task<IActionResult> GetMovies();
        Task<IActionResult> GetMoviesById(int id);
        Task<IActionResult> PostMovies(Movie newMovie);
        Task<IActionResult> PutMovies(int id, Movie updatedMovie);
        Task<IActionResult> DeleteMoviesById(int id);
    }

    public class MoviesService: IMoviesService{
        private readonly MvcMovieContext _context;

        public MoviesService(MvcMovieContext context){
            _context = context;
        }

        public async Task<IActionResult>  GetMovies(){
           var movies = await  _context.Movie.ToListAsync();
            
           return new JsonResult(
            new{
                movies
            }
           );

        }

        public async Task<IActionResult>  GetMoviesById(int id){
           var movie = await  _context.Movie.Where(m=>m.Id == id).ToListAsync();

           return new JsonResult(
            new{
                movie
            }
           );

        }

        public async Task<IActionResult>  PostMovies(Movie newMovie){
           var movieEntry = await  _context.Movie.AddAsync(newMovie);
           await _context.SaveChangesAsync();
           return new JsonResult(
            new{
                movie = movieEntry.Entity
            }
           );

        }

        public async Task<IActionResult>  PutMovies(int id , Movie updatedMovie){
           var movie = await  _context.Movie.Where(m=>m.Id == id).FirstOrDefaultAsync();

           if(movie == null){
                return new NotFoundResult();
            }
            updatedMovie.Id = id;
            _context.Movie.Update(updatedMovie);
            await _context.SaveChangesAsync();

           return  new JsonResult(
            new{
                movie = updatedMovie
            }
           );

        }

        public async Task<IActionResult>  DeleteMoviesById(int id){
           var movie = await  _context.Movie.Where(m=>m.Id == id).FirstOrDefaultAsync();

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