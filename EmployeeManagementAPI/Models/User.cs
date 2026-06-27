using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementAPI.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    public string Username { get; set; } = "";

    [Required]
    public string PasswordHash { get; set; } = "";

    [Required]
    public string Role { get; set; } = "";

    public bool MustChangePassword { get; set; }

    public int EmployeeId { get; set; }

    public Employee? Employee { get; set; }
}