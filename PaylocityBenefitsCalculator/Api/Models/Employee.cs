namespace Api.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public double Salary { get; set; } //changed to double. no need for decimal precision
        public DateTime DateOfBirth { get; set; }
        public ICollection<Dependent> Dependents { get; set; } = new List<Dependent>();
    }
}
