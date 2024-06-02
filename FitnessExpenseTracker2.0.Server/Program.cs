using FitnessExpenseTracker;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

// Seed DB
builder.Services.AddTransient<DBSeeder>();

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

var initialiser = services.GetRequiredService<DBSeeder>();

initialiser.Run();