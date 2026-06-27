using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementAPI.Services;

public class EmployeeService : IEmployeeService
{
    private readonly AppDbContext _context;

    public EmployeeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Employee>> GetAllAsync()
    {
        return await _context
            .Employees
            .ToListAsync();
    }

    public async Task<Employee?> GetByIdAsync(int id)
    {
        return await _context
            .Employees
            .FindAsync(id);
    }

    public async Task<Employee> CreateAsync(
        Employee employee)
    {
        _context.Employees.Add(employee);

        await _context.SaveChangesAsync();

        return employee;
    }

    public async Task<Employee?> UpdateAsync(
        int id,
        Employee employee)
    {
        var existing =
            await _context.Employees
                .FindAsync(id);

        if (existing == null)
            return null;

        existing.Name = employee.Name;
        existing.Email = employee.Email;
        existing.Department = employee.Department;

        await _context.SaveChangesAsync();

        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var employee =
            await _context.Employees
                .FindAsync(id);

        if (employee == null)
            return false;

        _context.Employees.Remove(employee);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<List<Employee>>
GetPagedAsync(
    int page,
    int pageSize)
{
    return await _context
        .Employees
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
}
public async Task<List<Employee>>
SearchAsync(string keyword)
{
    return await _context
        .Employees
        .Where(e =>
            e.Name.Contains(keyword)
            ||
            e.Department.Contains(keyword))
        .ToListAsync();
}
public async Task<List<Employee>> SortAsync(
    string field,
    bool ascending)
{
    IQueryable<Employee> query =
        _context.Employees;

    switch (field.ToLower())
    {
        case "name":
            query = ascending
                ? query.OrderBy(e => e.Name)
                : query.OrderByDescending(
                    e => e.Name);
            break;

        case "email":
            query = ascending
                ? query.OrderBy(e => e.Email)
                : query.OrderByDescending(
                    e => e.Email);
            break;

        case "department":
            query = ascending
                ? query.OrderBy(e => e.Department)
                : query.OrderByDescending(
                    e => e.Department);
            break;

        default:
            query = ascending
                ? query.OrderBy(e => e.Id)
                : query.OrderByDescending(
                    e => e.Id);
            break;
    }

    return await query.ToListAsync();
}
}