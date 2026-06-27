using EmployeeManagementAPI.DTOs;
using EmployeeManagementAPI.Models;
using EmployeeManagementAPI.Services;
using EmployeeManagementAPI.Data;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementAPI.Controllers;

using ClosedXML.Excel;
using System.IO;

using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _service;
    private readonly ILogger<EmployeeController> _logger;
    private readonly IAuditService _auditService;
    private readonly AppDbContext _context;

    public EmployeeController(
        IEmployeeService service,
        ILogger<EmployeeController> logger,
        IAuditService auditService,
        AppDbContext context)
    {
        _service = service;
        _logger = logger;
        _auditService = auditService;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _service.GetAllAsync();

        return Ok(employees.Select(e => new EmployeeResponseDto
        {
            Id = e.Id,
            Name = e.Name,
            Email = e.Email,
            Department = e.Department
        }));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await _service.GetByIdAsync(id);

        if (employee == null)
            return NotFound();

        return Ok(employee);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create(EmployeeCreateDto dto)
    {
        var employee = new Employee
        {
            Name = dto.Name,
            Email = dto.Email,
            Department = dto.Department
        };

        var created = await _service.CreateAsync(employee);

        await _auditService.LogAsync(
            $"Created employee {dto.Name}",
            User.Identity?.Name ?? "admin");

        return Ok(created);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, EmployeeUpdateDto dto)
    {
        var employee = new Employee
        {
            Name = dto.Name,
            Email = dto.Email,
            Department = dto.Department
        };

        var updated = await _service.UpdateAsync(id, employee);

        if (updated == null)
            return NotFound();

        return Ok(updated);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }

    // ---------------- LEAVE ----------------

    [HttpPost("leave")]
    public async Task<IActionResult> ApplyLeave(LeaveRequest request)
    {
        _context.LeaveRequests.Add(request);
        await _context.SaveChangesAsync();
        return Ok(request);
    }

    [HttpGet("leave/{employeeId}")]
    public async Task<IActionResult> GetLeaves(int employeeId)
    {
        var leaves = await _context.LeaveRequests
            .Where(x => x.EmployeeId == employeeId)
            .ToListAsync();

        return Ok(leaves);
    }

    // ---------------- PROFILE ----------------

    [HttpGet("profile/{id}")]
public async Task<IActionResult> GetProfile(int id)
{
    var employee =
        await _service.GetByIdAsync(id);

    if (employee == null)
        return NotFound();

    return Ok(
        new EmployeeResponseDto
        {
            Id = employee.Id,
            Name = employee.Name,
            Email = employee.Email,
            Department = employee.Department
        });
}

    [HttpPut("profile/{id}")]
    public async Task<IActionResult> UpdateProfile(int id, EmployeeUpdateDto dto)
    {
        var employee = await _service.GetByIdAsync(id);

        if (employee == null)
            return NotFound();

        employee.Name = dto.Name;
        employee.Email = dto.Email;
        employee.Department = dto.Department;

        await _service.UpdateAsync(id, employee);

        return Ok(employee);
    }

    // ---------------- ATTENDANCE ----------------

    [HttpGet("attendance/{employeeId}")]
    public async Task<IActionResult> GetAttendance(int employeeId)
    {
        var attendance = await _context.Attendances
            .Where(x => x.EmployeeId == employeeId)
            .ToListAsync();

        return Ok(attendance);
    }

    [Authorize(Roles = "Admin")]
[HttpGet("leave")]
public async Task<IActionResult> GetAllLeaves()
{
    var leaves =
        await _context.LeaveRequests
            .ToListAsync();

    return Ok(leaves);
}

[Authorize(Roles = "Admin")]
[HttpPut("leave/approve/{id}")]
public async Task<IActionResult> ApproveLeave(
    int id)
{
    var leave =
        await _context.LeaveRequests
            .FindAsync(id);

    if (leave == null)
        return NotFound();

    leave.Status = "Approved";

    await _context.SaveChangesAsync();

    return Ok(leave);
}

[Authorize(Roles = "Admin")]
[HttpPut("leave/reject/{id}")]
public async Task<IActionResult> RejectLeave(
    int id)
{
    var leave =
        await _context.LeaveRequests
            .FindAsync(id);

    if (leave == null)
        return NotFound();

    leave.Status = "Rejected";

    await _context.SaveChangesAsync();

    return Ok(leave);
}

[HttpPost("attendance")]
public async Task<IActionResult>
MarkAttendance()
{
    var employeeId =
        int.Parse(
            User.FindFirst("employeeId")!
                .Value);

    var alreadyMarked =
        await _context.Attendances
            .AnyAsync(x =>
                x.EmployeeId == employeeId &&
                x.Date.Date ==
                DateTime.Today);

    if (alreadyMarked)
    {
        return BadRequest(
            "Attendance already marked today");
    }

    var attendance =
        new Attendance
        {
            EmployeeId = employeeId,
            Date = DateTime.Today,
            Status = "Present",
            CheckInTime =
                DateTime.Now
        };

    _context.Attendances
        .Add(attendance);

    await _context.SaveChangesAsync();

    return Ok(attendance);
}

[HttpGet("attendance")]
public async Task<IActionResult>
GetMyAttendance()
{
    var employeeId =
        int.Parse(
            User.FindFirst("employeeId")!
                .Value);

    var attendance =
        await _context.Attendances
            .Where(x =>
                x.EmployeeId ==
                employeeId)
            .OrderByDescending(
                x => x.Date)
            .ToListAsync();

    return Ok(attendance);
}

[Authorize(Roles = "Admin")]
[HttpGet("attendance/all")]
public async Task<IActionResult>
GetAllAttendance()
{
    var attendance =
        await _context.Attendances
            .Include(x =>
                x.Employee)
            .OrderByDescending(
                x => x.Date)
            .ToListAsync();

    return Ok(attendance);
}
[HttpPost("change-password")]
public async Task<IActionResult>
ChangePassword(
    ChangePasswordDto dto)
{
    var username =
        User.Identity?.Name;

    var user =
        await _context.Users
            .FirstOrDefaultAsync(
                x => x.Username ==
                     username);

    if (user == null)
        return NotFound();

    if (user.PasswordHash !=
        dto.CurrentPassword)
    {
        return BadRequest(
            "Current password is incorrect");
    }

   user.PasswordHash =
    dto.NewPassword;
    user.MustChangePassword =
        false;

    await _context.SaveChangesAsync();

    return Ok(
        "Password changed successfully");
}

[Authorize(Roles = "Admin")]
[HttpGet("export")]
public async Task<IActionResult>
ExportEmployees()
{
    var employees =
        await _service.GetAllAsync();

    using var workbook =
        new XLWorkbook();

    var worksheet =
        workbook.Worksheets
            .Add("Employees");

    worksheet.Cell(1, 1).Value =
        "Id";

    worksheet.Cell(1, 2).Value =
        "Name";

    worksheet.Cell(1, 3).Value =
        "Email";

    worksheet.Cell(1, 4).Value =
        "Department";

    int row = 2;

    foreach (var employee
             in employees)
    {
        worksheet.Cell(row, 1)
            .Value =
            employee.Id;

        worksheet.Cell(row, 2)
            .Value =
            employee.Name;

        worksheet.Cell(row, 3)
            .Value =
            employee.Email;

        worksheet.Cell(row, 4)
            .Value =
            employee.Department;

        row++;
    }

    using var stream =
        new MemoryStream();

    workbook.SaveAs(stream);

    return File(
        stream.ToArray(),
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Employees.xlsx");
}

[Authorize(Roles = "Admin")]
[HttpGet("export-pdf")]
public async Task<IActionResult>
ExportEmployeesPdf()
{
    var employees =
        await _service.GetAllAsync();

    using var stream =
        new MemoryStream();

    var writer =
        new PdfWriter(stream);

    var pdf =
        new PdfDocument(writer);

    var document =
        new Document(pdf);

    document.Add(
        new Paragraph(
            "Employee Report")
            .SetFontSize(20));

    document.Add(
        new Paragraph(" "));

    var table =
        new Table(4);

    table.AddHeaderCell("Id");
    table.AddHeaderCell("Name");
    table.AddHeaderCell("Email");
    table.AddHeaderCell("Department");

    foreach (var employee in employees)
    {
        table.AddCell(
            employee.Id.ToString());

        table.AddCell(
            employee.Name);

        table.AddCell(
            employee.Email);

        table.AddCell(
            employee.Department);
    }

    document.Add(table);

    document.Close();

    return File(
        stream.ToArray(),
        "application/pdf",
        "EmployeeReport.pdf");
}

}