using FitnessExpenseTracker.Models;

namespace TestFitnessExpenseTracker
{
    public static class SetupHelper
    {
        public static Expense GenerateValidExpense()
        {
            Expense expense = new Expense();
            expense.Id = 123;
            expense.Name = "Bike helmet";
            expense.StravaUserID = "123456";
            expense.Amount = 70.00;
            expense.ExpenseType = ExpenseType.Equipment;
            expense.PurchaseDate = DateTime.Now;
            expense.LinkedActivity = "123456";
            expense.SportsType = SportType.Skiing;

            return expense;
        }

        public static Expense GenerateValidExpenseNoName()
        {
            Expense expense = GenerateValidExpense();
            expense.Name = null;

            return expense;
        }
    }
}
