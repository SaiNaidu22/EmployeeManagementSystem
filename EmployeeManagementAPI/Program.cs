using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Services;
using EmployeeManagementAPI.Middleware;

using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using System.Text;

var builder = WebApplication.CreateBuilder(args);




builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(
            new Version(8, 0, 32))));

builder.Services.AddScoped<
    IEmployeeService,
    EmployeeService>();

    builder.Services.AddScoped<
    IUserService,
    UserService>();
    
    builder.Services.AddScoped<
    IAuditService,
    AuditService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "ReactPolicy",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:5173",
                    "https://employee-management-system-ecru-eta.vercel.app")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services
    .AddAuthentication(
        JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer =
                    builder.Configuration["Jwt:Issuer"],

                ValidAudience =
                    builder.Configuration["Jwt:Audience"],

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            builder.Configuration["Jwt:Key"]!))
            };
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("ReactPolicy");

app.UseAuthentication();

app.UseAuthorization();



app.MapControllers();

app.Run();


