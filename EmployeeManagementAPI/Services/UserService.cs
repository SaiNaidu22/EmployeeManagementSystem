using BCrypt.Net;
using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementAPI.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(
        AppDbContext context)
    {
        _context = context;
    }

    public async Task<User> CreateUserAsync(
        string username,
        string role,
        int employeeId)
    {
        var tempPassword =
            "Welcome123";

var employee =
    await _context.Employees
        .FindAsync(employeeId);

if(employee == null)
{
    throw new Exception(
        $"Employee {employeeId} not found");
}
        var user = new User
        {
            Username = username,
            PasswordHash =
                BCrypt.Net.BCrypt
                    .HashPassword(
                        tempPassword),

            Role = role,

            EmployeeId = employeeId,

            MustChangePassword = true
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<User?>
    GetByUsernameAsync(
        string username)
    {
        return await _context.Users
            .FirstOrDefaultAsync(
                u => u.Username ==
                     username);
    }
}