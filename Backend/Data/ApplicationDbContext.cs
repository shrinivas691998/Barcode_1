using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Person> Persons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>()
                .HasIndex(p => p.BarcodeData)
                .IsUnique();

            modelBuilder.Entity<Person>()
                .Property(p => p.Sex)
                .HasConversion<string>();

            modelBuilder.Entity<Person>()
                .Property(p => p.Name)
                .IsRequired();

            modelBuilder.Entity<Person>()
                .Property(p => p.Age)
                .IsRequired();

            modelBuilder.Entity<Person>()
                .Property(p => p.Dob)
                .IsRequired();

            modelBuilder.Entity<Person>()
                .Property(p => p.Sex)
                .IsRequired();

            modelBuilder.Entity<Person>()
                .Property(p => p.BarcodeData)
                .IsRequired();
        }
    }
} 