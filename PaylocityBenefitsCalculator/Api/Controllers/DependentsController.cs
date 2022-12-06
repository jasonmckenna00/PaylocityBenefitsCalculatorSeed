using Api.Data;
using Api.Dtos.Dependent;
using Api.Dtos.Employee;
using Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DependentsController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly IMapper _mapper;

        public DependentsController(EmployeeDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }   

        [SwaggerOperation(Summary = "Get dependent by id")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<GetDependentDto>>> Get(int id)
        {
            var result = new ApiResponse<GetDependentDto>();
            var dependent = await _context.Dependents.FindAsync(id);

            if (dependent == null)
            {
                result.Error = "404";
                result.Message = "Unable to find Dependent";
                result.Success = false;
            }
            else
            {
                result.Data = _mapper.Map<GetDependentDto>(dependent);
                result.Success = true;
            }

            return result;
        }

        [SwaggerOperation(Summary = "Get all dependents")]
        [HttpGet("")]
        public async Task<ActionResult<ApiResponse<List<GetDependentDto>>>> GetAll()
        {
            var result = new ApiResponse<List<GetDependentDto>>();
            var dependents = await _context.Dependents
                .ToListAsync();

            result.Data = _mapper.Map<List<GetDependentDto>>(dependents);

            return result;

        }

        [SwaggerOperation(Summary = "Add dependent")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<GetDependentDto>>> AddDependent(AddDependentWithEmployeeIdDto newDependent)
        {
            // adding the constraint in the controller to reduce migrations/changes to data models
            var result = new ApiResponse<GetDependentDto>();
            var employee =  await _context.Employees
                .Include(x => x.Dependents
                    .Where(d => d.Relationship == Relationship.Spouse || d.Relationship == Relationship.DomesticPartner))
                .FirstOrDefaultAsync(x => x.Id == newDependent.EmployeeId);

            if (employee == null)
            {
                result.Error = "404";
                result.Message = "Unable to find Employee";
                result.Success = false;
                return result;
            }

            var isSpouseOrDomesticPartner =
                newDependent.Relationship is Relationship.Spouse or Relationship.DomesticPartner;

            if (isSpouseOrDomesticPartner && employee.Dependents.Count != 0)
            {
                result.Error = "400";
                result.Message = "Cannot add another Partner";
                result.Success = false;
                return result;
            
            }

            var dependent = _mapper.Map<Dependent>(newDependent);
            _context.Dependents.Add(dependent);
            await _context.SaveChangesAsync();

            result.Data = _mapper.Map<GetDependentDto>(dependent);
            return result;

        }

        [SwaggerOperation(Summary = "Update dependent")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<GetDependentDto>>> UpdateDependent(int id, UpdateDependentDto updatedDependent)
        {
            var result = new ApiResponse<GetDependentDto>();
            var dependent = await _context.Dependents.FindAsync(id);

            if (dependent == null)
            {
                result.Error = "404";
                result.Message = "Unable to find Dependant";
                result.Success = false;
                return result;
            }
            var employee = await _context.Employees
                //.Include(x => x.Dependents
                //    .Where(d => d.Relationship == Relationship.Spouse || d.Relationship == Relationship.DomesticPartner))
                .Include(x=> x.Dependents)
                .FirstOrDefaultAsync(x => x.Id == dependent.EmployeeId);

            if (employee == null)
            {
                result.Error = "404";
                result.Message = "Unable to find Employee";
                result.Success = false;
                return result;
            }

            var isSpouseOrDomesticPartner =
                updatedDependent.Relationship is Relationship.Spouse or Relationship.DomesticPartner;

            if (isSpouseOrDomesticPartner && employee.Dependents.Count != 0)
            {
                if (employee.Dependents.Any(dep => dep.Relationship == Relationship.Spouse || dep.Relationship == Relationship.DomesticPartner))
                {
                    result.Error = "400";
                    result.Message = "Cannot add another Partner";
                    result.Success = false;
                    return result;
                }
            }

            dependent.FirstName = updatedDependent.FirstName;
            dependent.LastName = updatedDependent.LastName;
            dependent.DateOfBirth = updatedDependent.DateOfBirth;
            dependent.Relationship = updatedDependent.Relationship;

            _context.Dependents.Update(dependent);
            await _context.SaveChangesAsync();
            result.Data = _mapper.Map<GetDependentDto>(dependent);
            return result;
        }

        [SwaggerOperation(Summary = "Delete dependent")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<GetDependentDto>>> DeleteDependent(int id)
        {
            var result = new ApiResponse<GetDependentDto>();
            var dependent = await _context.Dependents.FindAsync(id);
            if (dependent == null)
            {
                result.Error = "404";
                result.Message = "Unable to find Dependent";
                result.Success = false;
                return result;
            }

            _context.Dependents.Remove(dependent);
            await _context.SaveChangesAsync();
            result.Data = _mapper.Map<GetDependentDto>(dependent);
            return result;
        }

        
    }
}
