using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Services;

public interface IEmployeeService
{
    Task<List<Employee>> GetAllAsync();

    Task<Employee?> GetByIdAsync(int id);

    Task<Employee> CreateAsync(Employee employee);

    Task<Employee?> UpdateAsync(
        int id,
        Employee employee);

    Task<bool> DeleteAsync(int id);

    Task<List<Employee>> GetPagedAsync(
    int page,
    int pageSize);

    Task<List<Employee>> SearchAsync(string keyword);

    Task<List<Employee>> SortAsync(
    string field,
    bool ascending);
}