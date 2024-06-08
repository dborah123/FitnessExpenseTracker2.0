using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System.Text.Json;

namespace FitnessExpenseTracker.Controllers
{
 
    public class ExpenseController : Controller
    {
        public readonly IConfiguration configuration;

        public ExpenseController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GetExpenses()
        {
            string? configString = configuration.GetConnectionString("MyDb");

           if (configString is null)
           {
                return "";
           }

           using (var connection = new SqliteConnection(configString))
           {
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText = @"SELECT * FROM Expenses";

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var x = reader.GetString(0);
                    }
                }



           }

            return "";

        }
    }
}
