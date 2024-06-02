
namespace FitnessExpenseTracker.Models
{
    /// <summary>
    /// Represents the types of expenses
    /// </summary>
    public enum ExpenseType
    {
        Equipment,
        SeasonPass,
        Ticket,
        Gas,
        Food,
        Donation,
        Other
    };

    /// <summary>
    /// Class the represents an expense
    /// </summary>
    public class Expense
    {
        private string name;
        private double amount;
        private ExpenseType expenseType;
        private DateTime purchaseDate;
        private string? linkedActivity;
        private SportType? sportsType;

        #region Constructors
        public Expense(string? name, double amount, ExpenseType expenseType, DateTime purchaseDate)
        {
            this.amount = amount;
            this.expenseType = expenseType;
            this.purchaseDate = purchaseDate;

            if (name == null)
            {
                // Set auto-generated name string
                this.name = GenerateExpenseName(expenseType, purchaseDate);
            }
            else
            {
                this.name = name;
            }

        }

        public Expense(string? name, double amount, ExpenseType expenseType, DateTime purchaseDate, string activity, SportType sportType) 
            : this(name, amount, expenseType, purchaseDate)
        {
            this.linkedActivity = activity;
            this.sportsType = sportType;
        }
        #endregion

        #region Helper functions
        private string GenerateExpenseName(ExpenseType expenseType, DateTime purchaseDate)
        {
            string expenseTypeName;
            if (expenseType == ExpenseType.Other)
            {
                expenseTypeName = "Expense";
            }
            else
            {
                expenseTypeName = expenseType.ToString();
            }

            return string.Format("{0} at {1}", expenseTypeName, purchaseDate.Date.ToString("dd/MM/yyyy"));
        }
        #endregion
    }
}
