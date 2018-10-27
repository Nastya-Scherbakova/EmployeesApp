using EmployeesApp.Models;
using Microsoft.EntityFrameworkCore;


namespace EmployeesApp.Data
{
    public class EmployeeContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public EmployeeContext(DbContextOptions<EmployeeContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeJob>()
                .HasKey(bc => new { bc.EmployeeId, bc.JobId });

            modelBuilder.Entity<EmployeeJob>()
                .HasOne(bc => bc.Employee)
                .WithMany(b => b.EmployeeJobs)
                .HasForeignKey(bc => bc.EmployeeId);

            modelBuilder.Entity<EmployeeJob>()
                .HasOne(bc => bc.Job)
                .WithMany(c => c.EmployeeJobs)
                .HasForeignKey(bc => bc.JobId);
        }
    }
}
