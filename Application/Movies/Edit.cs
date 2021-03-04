using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Movies
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Movie Movie { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var movie = await _context.Movies.FindAsync(request.Movie.Id);

                _mapper.Map(request.Movie, movie);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}