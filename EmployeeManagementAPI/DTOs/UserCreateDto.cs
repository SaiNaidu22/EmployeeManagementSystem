namespace EmployeeManagementAPI.DTOs;

public class UserCreateDto
{
    public string Username { get; set; } = "";

    public string Password { get; set; } = "";

    public string Role { get; set; } = "Employee";

    public int EmployeeId { get; set; }
}