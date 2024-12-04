using FitnessExpenseTracker;
using FitnessExpenseTracker2._0.Server.Env;
using Microsoft.AspNetCore.Mvc.Formatters;

var root = Directory.GetCurrentDirectory();
var dotenv = Path.Combine(root, ".env");
DotEnv.Load(dotenv);
var config = new ConfigurationBuilder().AddEnvironmentVariables().Build();

var builder = WebApplication.CreateBuilder(args);

var specificOrgins = "AppOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: specificOrgins,
                      policy =>
                      {
                            //policy.WithOrigins("https://localhost:5173")
                            policy.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod(); ;
                      });
});

builder.Services.AddMvc(options =>
{
    options.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors(specificOrgins);

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