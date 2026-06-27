using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementAPI.DTOs;

public class EmployeeUpdateDto
{
    [Required]
    public required string Name { get; set; }
public required string Email { get; set; }
public required string Department { get; set; }
}