

using Api.Dtos.Dependent;
using Api.Dtos.Employee;
using Api.Models;
using AutoMapper;

namespace Api.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Employee, AddEmployeeDto>().ReverseMap();
            CreateMap<Employee, GetEmployeeDto>().ReverseMap();
            CreateMap<Employee, UpdateEmployeeDto>().ReverseMap();
            CreateMap<GetEmployeeDto, UpdateEmployeeDto>().ReverseMap();

            CreateMap<Dependent, AddDependentDto>().ReverseMap();
            CreateMap<Dependent, UpdateDependentDto>().ReverseMap();
            CreateMap<Dependent, GetDependentDto>().ReverseMap();
            CreateMap<Dependent, AddDependentWithEmployeeIdDto>().ReverseMap();
            CreateMap<GetDependentDto, UpdateDependentDto>().ReverseMap();
            CreateMap<GetDependentDto, AddDependentWithEmployeeIdDto>().ReverseMap();




        }
    }
}
