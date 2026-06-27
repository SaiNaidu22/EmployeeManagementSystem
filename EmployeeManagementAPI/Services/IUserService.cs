using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Services;

public interface IUserService
{
    Task<User> CreateUserAsync(
        string username,
        string role,
        int employeeId);

    Task<User?> GetByUsernameAsync(
        string username);
}