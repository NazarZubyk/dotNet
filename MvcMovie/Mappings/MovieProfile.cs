using AutoMapper;
using MvcMovie.Dtos;
using MvcMovie.Models;

namespace MvcMovie.Mappings{
    public class MovieProfile : Profile{
        public MovieProfile(){
            CreateMap<Movie,MovieDTO>();
            CreateMap<MovieDTO,Movie>();
        }

    }
}

