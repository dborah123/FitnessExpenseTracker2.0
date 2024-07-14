using FitnessExpenseTracker;
using FitnessExpenseTracker.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Specialized;
using System.Web;

namespace FitnessExpenseTracker2._0.Server.Controllers
{
    [Route("api/Register")]
    [ApiController]
    public class RegisterClientController : Controller
    {
        private readonly ApplicationDbContext _context;
        private static readonly HttpClient client = new HttpClient();

        public RegisterClientController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Register
        [HttpGet("{code}")]
        public async Task<JsonResult> RegisterClient(string code)
        {
            NameValueCollection queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString.Add("client_id", Environment.GetEnvironmentVariable("CLIENT_ID"));
            queryString.Add("client_secret", Environment.GetEnvironmentVariable("CLIENT_SECRET"));
            queryString.Add("code", code);
            queryString.Add("grant_type", "authorization_code");

            string url = "https://www.strava.com/oauth/token?" + queryString.ToString();

            var response = await client.PostAsync(url, null);
            var responseString = await response.Content.ReadAsStringAsync();
            
            return Json(responseString);
        }
    }


}
