using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementAPI.Models;

public class Attendance
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public string Status { get; set; } = "";

    public DateTime CheckInTime { get; set; }

    public Employee? Employee { get; set; }
}