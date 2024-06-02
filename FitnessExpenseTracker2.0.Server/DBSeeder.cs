using Microsoft.EntityFrameworkCore;

namespace FitnessExpenseTracker
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }

    public class DBSeeder
    {

        private readonly ApplicationDbContext _context;

        public DBSeeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Run()
        {
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            // TODO: Seed with sample data
        }
    }
}