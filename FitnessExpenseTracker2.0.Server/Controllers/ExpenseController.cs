using FitnessExpenseTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;

namespace FitnessExpenseTracker.Controllers
{
    [Route("api/expense/[controller]")]
    [ApiController]
    public class ExpenseController : Controller
    {
        public readonly IConfiguration configuration;

        public ExpenseController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        [Route("GetAllExpenses")]
        public String GetExpenses()
        {
            SqlConnection connection = new SqlConnection(configuration.GetConnectionString("FitnessExpenseTrackerLocalDB").ToString());
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Expenses", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);

            List<Expense> expenseList = new List<Expense>();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    double amount = Convert.ToInt32(dt.Rows[i]["Amount"]);
                    ExpenseType expenseType = ExpenseType.Other;
                    DateTime purchaseDate = Convert.ToDateTime(dt.Rows[i]["PurchaseData"]);

                    Expense expense = new Expense("", amount, expenseType, purchaseDate);
                    expenseList.Add(expense);
                }
            }

            if (expenseList.Count > 0)
            {
                return JsonConvert.SerializeObject(expenseList);
            }
            else
            {
                Response.StatusCode = 100;
                return JsonConvert.SerializeObject(Response);
            }
        }
    }
}
