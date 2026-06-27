namespace EmployeeManagementAPI.DTOs;

public class CreateUserDto
{
    public string Username { get; set; } = "";

    public string Role { get; set; } = "Employee";

    public int EmployeeId { get; set; }
}