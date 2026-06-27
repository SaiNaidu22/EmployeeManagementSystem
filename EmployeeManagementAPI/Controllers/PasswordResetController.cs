using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PasswordResetController
    : ControllerBase
{
    private readonly AppDbContext
        _context;

    public PasswordResetController(
        AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("request")]
    public async Task<IActionResult>
    RequestReset(
        int employeeId)
    {
        var request =
            new PasswordResetRequest
            {
                EmployeeId =
                    employeeId
            };

        _context
            .PasswordResetRequests
            .Add(request);

        await _context
            .SaveChangesAsync();

        return Ok(
            "Request submitted");
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("pending")]
    public async Task<IActionResult>
    GetPendingRequests()
    {
        var requests =
            await _context
                .PasswordResetRequests
                .Where(
                    x =>
                    x.Status ==
                    "Pending")
                .ToListAsync();

        return Ok(requests);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("approve/{id}")]
    public async Task<IActionResult>
    ApproveReset(
        int id)
    {
        var request =
            await _context
                .PasswordResetRequests
                .FindAsync(id);

        if(request == null)
            return NotFound();

        var user =
            await _context.Users
                .FirstOrDefaultAsync(
                    x =>
                    x.EmployeeId ==
                    request.EmployeeId);

        if(user == null)
            return NotFound();

        user.PasswordHash =
            "Welcome123";

        user.MustChangePassword =
            true;

        request.Status =
            "Approved";

        await _context
            .SaveChangesAsync();

        return Ok();
    }
}