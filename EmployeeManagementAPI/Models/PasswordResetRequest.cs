namespace EmployeeManagementAPI.Models;

public class PasswordResetRequest
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }

    public string Status { get; set; }
        = "Pending";

    public DateTime RequestedAt
    {
        get;
        set;
    } = DateTime.Now;
}