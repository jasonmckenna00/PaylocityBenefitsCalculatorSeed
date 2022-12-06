using Api.Dtos.Dependent;

namespace Api.Dtos.Employee
{
    public class UpdateEmployeeDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public double Salary { get; set; }
        //public ICollection<GetDependentDto> Dependents { get; set; } = new List<GetDependentDto>();
    }
}
