using EmployeeManagementAPI.DTOs;
using EmployeeManagementAPI.Data;

using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _context;

    public AuthController(
        IConfiguration configuration,
        AppDbContext context)
    {
        _configuration = configuration;
        _context = context;
    }

    [HttpPost("login")]
public IActionResult Login(
    LoginRequestDto request)
{
    var user =
    _context.Users
        .FirstOrDefault(
            x => x.Username ==
                 request.Username);

if (user == null)
{
    return BadRequest($"User '{request.Username}' not found");
}

if (user.PasswordHash != request.Password)
{
    return BadRequest(
        $"Password mismatch. DB='{user.PasswordHash}', Request='{request.Password}'");
}
    var token =
        GenerateJwtToken(
            user.Username,
            user.Role,
            user.EmployeeId);

    return Ok(
        new LoginResponseDto
        {
            Token = token,
            Role = user.Role,
            EmployeeId = user.EmployeeId,
            MustChangePassword =
            user.MustChangePassword
        });
}

    private string GenerateJwtToken(
        string username,
        string role,
        int employeeId)
    {
        var claims = new[]
        {
            new Claim(
                ClaimTypes.Name,
                username),

            new Claim(
                ClaimTypes.Role,
                role),

            new Claim(
                "employeeId",
                employeeId.ToString())
        };

        var key =
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]!));

        var credentials =
            new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

        var token =
            new JwtSecurityToken(
                issuer:
                    _configuration["Jwt:Issuer"],

                audience:
                    _configuration["Jwt:Audience"],

                claims:
                    claims,

                expires:
                    DateTime.Now.AddHours(2),

                signingCredentials:
                    credentials);

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}