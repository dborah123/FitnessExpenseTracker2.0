using FitnessExpenseTracker.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
//using System.Data.Entity;

namespace FitnessExpenseTracker
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() { }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=database.db;");
        }

        public DbSet<Expense> Expense { get; set; }
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