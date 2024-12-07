using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS with specific origin
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowed(_ => true) // Allow any origin during development
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure DB Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Kestrel
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5000); // Listen on port 5000
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    
    // Disable HTTPS redirection in development
    app.Use(async (context, next) =>
    {
        context.Request.Scheme = "http";
        await next();
    });
}

// Important: UseCors must be called before UseRouting and UseEndpoints
app.UseCors();

// Comment out HTTPS redirection for now
// app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

try
{
    // Log startup
    Console.WriteLine("Starting application on http://localhost:5000");
    await app.RunAsync();
}
catch (Exception ex)
{
    Console.WriteLine($"Application startup failed: {ex.Message}");
    throw;
} 