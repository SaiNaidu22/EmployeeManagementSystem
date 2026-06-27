using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.DTOs;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementAPI.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminController(
        AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult>
    GetDashboard()
    {
        var today =
            DateTime.Today;

        var result =
            new DashboardDto
            {
                TotalEmployees =
                    await _context.Employees
                        .CountAsync(),

                PendingLeaves =
                    await _context.LeaveRequests
                        .CountAsync(
                            x => x.Status ==
                                 "Pending"),

                ApprovedLeaves =
                    await _context.LeaveRequests
                        .CountAsync(
                            x => x.Status ==
                                 "Approved"),

                PresentToday =
                    await _context.Attendances
                        .CountAsync(
                            x => x.Date.Date ==
                                 today)
            };

        return Ok(result);
    }
}