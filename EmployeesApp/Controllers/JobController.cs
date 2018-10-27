using System.Collections.Generic;
using System.Threading.Tasks;
using EmployeesApp.Data;
using EmployeesApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace EmployeesApp.Controllers
{
    [Route("api/[controller]")]
    public class JobController : Controller
    {
        private EmployeeContext context;
        public JobController(EmployeeContext _context)
        {
            context = _context;
        }
        // GET: api/Job
        [HttpGet]
        public async Task<IEnumerable<Job>> Get()
        {
            return await context.Jobs.ToListAsync();
        }

        
    }
}
