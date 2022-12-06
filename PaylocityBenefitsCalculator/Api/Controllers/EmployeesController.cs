using System.Security.Cryptography.X509Certificates;
using Api.Data;
using Api.Dtos.Dependent;
using Api.Dtos.Employee;
using Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly IMapper _mapper;
        public EmployeesController(EmployeeDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        [SwaggerOperation(Summary = "Get employee by id")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<GetEmployeeDto>>> Get(int id)
        {
            var result = new ApiResponse<GetEmployeeDto>();
            var employee = await _context.Employees
                .Include(x=>x.Dependents)
                .FirstOrDefaultAsync(x=> x.Id == id);
            
            if (employee == null)
            {
                result.Error = "404";
                result.Message = "Unable to find Employee";
                result.Success = false;
            }
            else
            {
                result.Data = _mapper.Map<GetEmployeeDto>(employee);
                result.Success = true;
            }

            return result;

            //throw new NotImplementedException();
        }

        [SwaggerOperation(Summary = "Get all employees")]
        [HttpGet("")]
        public async Task<ActionResult<ApiResponse<List<GetEmployeeDto>>>> GetAll()
        {
            var result = new ApiResponse<List<GetEmployeeDto>>();
            var employees = await _context.Employees
                .Include(x => x.Dependents)
                .ToListAsync();
            

            result.Data = _mapper.Map<List<GetEmployeeDto>>(employees);

            return result;
            
        }

        [SwaggerOperation(Summary = "Add employee")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<AddEmployeeDto>>> AddEmployee(AddEmployeeDto newEmployee)
        {
            var result = new ApiResponse<AddEmployeeDto>();
            var employee = _mapper.Map<Employee>(newEmployee);
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            result.Data = _mapper.Map<AddEmployeeDto>(employee);
            return result;

        }

        [SwaggerOperation(Summary = "Update employee")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<GetEmployeeDto>>> UpdateEmployee(int id, UpdateEmployeeDto updatedEmployee)
        {
            var result = new ApiResponse<GetEmployeeDto>();
            var employee = await _context.Employees
                .Include(x => x.Dependents)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (employee == null)
            {
                result.Error = "404";
                result.Message = "Unable to find Employee";
                result.Success = false;
                return result;
            }

            employee.FirstName = updatedEmployee.FirstName;
            employee.LastName = updatedEmployee.LastName;
            employee.Salary = updatedEmployee.Salary;
            
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();

            result.Data = _mapper.Map<GetEmployeeDto>(employee);
            return result;

        }

        [SwaggerOperation(Summary = "Delete employee")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<GetEmployeeDto>>> DeleteEmployee(int id)
        {
            var result = new ApiResponse<GetEmployeeDto>();
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                result.Error = "404";
                result.Message = "Unable to find Employee";
                result.Success = false;
                return result;
            }
            

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            result.Data = _mapper.Map<GetEmployeeDto>(employee);
            return result;

        }
    }
}
