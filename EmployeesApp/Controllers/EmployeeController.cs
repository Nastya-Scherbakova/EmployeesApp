using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using Microsoft.EntityFrameworkCore;
using EmployeesApp.Models;
using Microsoft.AspNetCore.Mvc;
using EmployeesApp.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeesApp.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private EmployeeContext context;
        public EmployeeController(EmployeeContext _context)
        {
            context = _context;
        }
        // GET: api/Employee
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await context.Employees.Include("EmployeeJobs.Job").AsNoTracking().ToListAsync();
                foreach(var emp in result)
                {
                    foreach(var empJob in emp.EmployeeJobs)
                    {
                        empJob.Employee = null;
                        empJob.Job.EmployeeJobs = null;
                    }
                }
                return Ok(result);
            }
            catch(Exception ex)
            {
                return NoContent();
            }
            
        }

        // GET api/Employee/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/Employee
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Employee employee)
        {
            if (employee is null)
            {
                return BadRequest("Employee is empty");
            }
            if (employee.FirstName.Length < 2 || employee.LastName.Length < 2 || employee.EmploymentDate == default(DateTime) || employee.Rate < 1)
            {
                return BadRequest("Employee data is not correct");
            }
            if(context.Employees.Any(el =>el.FirstName == employee.FirstName && el.LastName == employee.LastName))
            {
                return Conflict("Employee with this contacts was found");
            }
            foreach(var job in employee.EmployeeJobs)
            {
                var newJob = await context.Jobs.FirstAsync(el=>el.Title == job.Job.Title);
                job.Job = newJob;
            }
            context.Employees.Add(employee);

            try
            {
                await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return StatusCode(500);
            }
            
            return Ok();
        }

        // PUT api/Employee/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/Employee/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            context.Employees.Remove(context.Employees.Find(id));
            context.SaveChanges();
        }
    }
}
