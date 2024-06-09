using FitnessExpenseTracker.Models;

namespace TestFitnessExpenseTracker
{
    public class ExpenseValidationTests
    {

        #region Unit Tests
        [Fact]
        public void ValidExpense()
        {
            Expense expense = SetupHelper.GenerateValidExpense();
            string errorString;

            Assert.True(expense.IsExpenseValid(out errorString));
            Assert.Empty(errorString);
        }

        [Fact]
        public void ValidExpenseWithAutoGeneration()
        {
            Expense expense = SetupHelper.GenerateValidExpenseNoName();
            string errorString;

            expense.Name = null;

            Assert.True(expense.IsExpenseValid(out errorString, true));
            Assert.Empty(errorString);
            Assert.NotEmpty(expense.Name);
        }

        [Fact]
        public void InvalidBlankName()
        {
            Expense expense = SetupHelper.GenerateValidExpenseNoName();
            string errorString;

            expense.Name = null;

            Assert.False(expense.IsExpenseValid(out errorString, false));
            Assert.Equal(errorString, Expense.NameInvalid);
        }
        [Fact]
        public void InvalidStravaUserId()
        {
            Expense expense = SetupHelper.GenerateValidExpense();
            string errorString;

            expense.StravaUserID = null;

            Assert.False(expense.IsExpenseValid(out errorString, false));
            Assert.Equal(errorString, Expense.StravaUserIDInvalid);
        }

        [Fact]
        public void InvalidAmount()
        {
            Expense expense = SetupHelper.GenerateValidExpense();
            string errorString;

            expense.Amount = -5.00;

            Assert.False(expense.IsExpenseValid(out errorString, false));
            Assert.Equal(errorString, Expense.AmountInvalid);
        }

        [Fact]
        public void InvalidOldPurchaseDate()
        {
            Expense expense = SetupHelper.GenerateValidExpense();
            string errorString;

            expense.PurchaseDate = new DateTime(1999, 12, 31);

            Assert.False(expense.IsExpenseValid(out errorString, false));
            Assert.Equal(errorString, Expense.PurchaseDateInvalid);
        }

        [Fact]
        public void InvalidFuturePurchaseDate()
        {
            Expense expense = SetupHelper.GenerateValidExpense();
            string errorString;

            expense.PurchaseDate = DateTime.Now.AddDays(1);

            Assert.False(expense.IsExpenseValid(out errorString, false));
            Assert.Equal(errorString, Expense.PurchaseDateInvalid);
        }
        #endregion
    }
}