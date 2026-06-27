namespace EmployeeManagementAPI.DTOs;

public class LoginResponseDto
{
    public string Token { get; set; } = "";

    public string Role { get; set; } = "";

    public int EmployeeId { get; set; }

    public bool MustChangePassword
{
    get;
    set;
}
}