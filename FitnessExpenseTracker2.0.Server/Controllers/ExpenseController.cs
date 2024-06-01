using Microsoft.AspNetCore.Mvc;

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

        public JsonResult GetExpenses()
        {

        }
    }
}
