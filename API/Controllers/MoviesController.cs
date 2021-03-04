using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Movies;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class MoviesController : BaseApiController
    {


        [HttpGet]
        public async Task<ActionResult<List<Movie>>> GetMovies()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateMovie(Movie movie)
        {
            return Ok(await Mediator.Send(new Create.Command{Movie = movie}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditMovie(Guid id, Movie movie)
        {
            movie.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Movie = movie}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}