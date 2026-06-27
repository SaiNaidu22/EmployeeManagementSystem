using EmployeeManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<AuditLog> AuditLogs { get; set; }

    public DbSet<LeaveRequest> LeaveRequests { get; set; }

    public DbSet<Attendance> Attendances { get; set; }

    public DbSet<PasswordResetRequest>
    PasswordResetRequests
{
    get;
    set;
}
}
