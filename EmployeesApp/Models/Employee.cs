using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesApp.Models
{
    public class Employee
    {
        public int Id {get;set;}
        public string FirstName {get;set;}
        public string LastName{get;set;}
        public List<EmployeeJob> EmployeeJobs {get;set;}
        public DateTime EmploymentDate{get;set;}
        public decimal Rate{get;set;}
        readonly DateTime CreationDate;
        public Employee()
        {
            CreationDate = DateTime.Now;
        }

    }

}
