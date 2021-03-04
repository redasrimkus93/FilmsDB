using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Movies
{
    public class Create
    {
        public class Command : IRequest
        {
            public Movie Movie { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Movies.Add(request.Movie);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}