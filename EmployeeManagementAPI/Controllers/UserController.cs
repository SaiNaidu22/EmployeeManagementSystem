// using EmployeeManagementAPI.DTOs;
// using EmployeeManagementAPI.Services;
// using Microsoft.AspNetCore.Mvc;

// namespace EmployeeManagementAPI.Controllers;

// [ApiController]
// [Route("api/[controller]")]
// public class UserController : ControllerBase
// {
//     private readonly IUserService _service;

//     public UserController(
//         IUserService service)
//     {
//         _service = service;
//     }

//     [HttpPost]
//     public async Task<IActionResult>
//     CreateUser(
//         CreateUserDto dto)
//     {
//         var user =
//             await _service
//                 .CreateUserAsync(
//                     dto.Username,
//                     dto.Role,
//                     dto.EmployeeId);

//         return Ok(new
//         {
//             message =
//                 "User created",

//             tempPassword =
//                 "Welcome123"
//         });
//     }
// }

using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.DTOs;
using EmployeeManagementAPI.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementAPI.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserController(
        AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(
            _context.Users.ToList());
    }

   [HttpPost]
[HttpPost]
public async Task<IActionResult>
CreateUser(UserCreateDto dto)
{
    try
    {
        var employee =
            await _context.Employees
                .FindAsync(
                    dto.EmployeeId);

        if(employee == null)
        {
            return BadRequest(
                $"Employee {dto.EmployeeId} not found");
        }

        var existingUser =
            _context.Users
                .FirstOrDefault(
                    x => x.Username ==
                         dto.Username);

        if(existingUser != null)
        {
            return BadRequest(
                "Username already exists");
        }

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = dto.Password,
            Role = dto.Role,
            EmployeeId = dto.EmployeeId
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return Ok(user);
    }
    catch(Exception ex)
    {
        return BadRequest(
            ex.InnerException?.Message ??
            ex.Message);
    }
}

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(
        int id)
    {
        var user =
            await _context.Users.FindAsync(id);

        if (user == null)
            return NotFound();

        _context.Users.Remove(user);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("reset-password/{id}")]
public async Task<IActionResult>
ResetPassword(int id)
{
    var user =
        await _context.Users
            .FindAsync(id);

    if(user == null)
        return NotFound();

    user.PasswordHash =
        "Welcome123";

    user.MustChangePassword =
        true;

    await _context.SaveChangesAsync();

    return Ok(
        "Password reset successfully");
}
}