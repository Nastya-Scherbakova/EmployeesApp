using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesApp.Models
{
    public class Job
    {
        public int Id {get;set;}
        public string Title {get;set;}
        public List<EmployeeJob> EmployeeJobs {get;set;}
    }

    public class EmployeeJob
    {
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
    }
}
