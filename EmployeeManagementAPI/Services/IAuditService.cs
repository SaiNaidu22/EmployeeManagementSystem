using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Services;

public interface IAuditService
{
    Task LogAsync(
        string action,
        string username
    );
}