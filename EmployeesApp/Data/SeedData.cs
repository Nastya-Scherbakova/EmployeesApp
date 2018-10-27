using EmployeesApp.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesApp.Data
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            IServiceScopeFactory scopeFactory = serviceProvider.GetRequiredService<IServiceScopeFactory>();

            using (IServiceScope scope = scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<EmployeeContext>();

                context.Database.EnsureCreated();
            if (!context.Employees.Any())
            {
                context.Employees.Add(new Employee()
                {
                    FirstName = "Fred",
                    LastName = "Bottom",
                    Rate = 15,
                    EmploymentDate = new DateTime(2015, 7, 20),
                    EmployeeJobs = new List<EmployeeJob>(){
                        new EmployeeJob(){Job = new Job(){ Title = "Founder" } }, new EmployeeJob(){ Job = new Job(){ Title = "CEO" } } }
                });
                context.Employees.Add(new Employee()
                {
                    FirstName = "Mike",
                    LastName = "Ross",
                    Rate = 25,
                    EmploymentDate = new DateTime(2016, 4, 5),
                    EmployeeJobs = new List<EmployeeJob>(){
                        new EmployeeJob(){Job = new Job(){ Title = "Developer" } } }
                });
                context.SaveChanges();
            }
            }
            
            
        }
    }
}
