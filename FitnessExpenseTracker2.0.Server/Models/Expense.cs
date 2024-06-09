
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

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
    [Table("Expenses")]
    public class Expense
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        [Required]
        public string? StravaUserID { get; set; }
        public double Amount { get; set; }
        public ExpenseType ExpenseType { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string? LinkedActivity { get; set; }
        public SportType? SportsType { get; set; }

        #region Validation
        /// <summary>Determines whether the Expense is valid.</summary>
        /// <param name="errorString">The outputted error string.</param>
        /// <param name="allowNameGen">if set to <c>true</c> to allow automatic name generation if name is not specified.</param>
        /// <returns>
        ///   <c>true</c> if the expense is valid; otherwise, <c>false</c>.</returns>
        public bool IsExpenseValid(out string errorString, bool allowNameGen = false)
        {
            StringBuilder errorStringBuilder = new StringBuilder();

            if (!this.IsNameValid(allowNameGen))
            {
                errorStringBuilder.Append(NameInvalid);
            }

            if (!this.IsStravaUserIDValid())
            {
                errorStringBuilder.Append(StravaUserIDInvalid);
            }

            if (!this.IsAmountValid())
            {
                errorStringBuilder.Append(AmountInvalid);
            }

            if (!this.IsExpenseTypeValid())
            {
                errorStringBuilder.Append(ExpenseTypeInvalid);
            }

            if (!this.IsPurchaseDateValid())
            {
                errorStringBuilder.Append(PurchaseDateInvalid);
            }

            if (!this.IsLinkedActivityValid())
            {
                errorStringBuilder.Append(LinkedActivityInvalid);
            }

            if (!this.IsSportsTypeValid())
            {
                errorStringBuilder.Append(SportsTypeInvalid);
            }

            errorString = errorStringBuilder.ToString();

            return errorString.IsNullOrEmpty();
        }

        /// <summary>Determines whether the name is valid.</summary>
        /// <param name="allowNameGen">if set to <c>true to</c> allow automatic name generation if name not specified.</param>
        /// <returns>
        ///   <c>true</c> if name valid; otherwise, <c>false</c>.</returns>
        private bool IsNameValid(bool allowNameGen = false)
        {
            if (allowNameGen && this.Name == null)
            {
                this.Name = GenExpenseName(this.ExpenseType, this.PurchaseDate);
            }

            return this.Name is not null;
        }
        /// <summary>Determines whether the strava user identifier is valid.</summary>
        /// <returns>
        ///   <c>true</c> if strava user identifier valid; otherwise, <c>false</c>.</returns>
        private bool IsStravaUserIDValid()
        {
            return this.StravaUserID is not null;
        }

        /// <summary>Determines whether the amount is valid.</summary>
        /// <returns>
        ///   <c>true</c> if amount is valid; otherwise, <c>false</c>.</returns>
        private bool IsAmountValid()
        {
            if (this.Amount >= 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>Determines whether the expense type is valid.</summary>
        /// <returns>
        ///   <c>true</c> if the expense type is valid; otherwise, <c>false</c>.</returns>
        private bool IsExpenseTypeValid()
        {

            if (Enum.IsDefined(typeof(ExpenseType), this.ExpenseType))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>Determines whether the purchase date falls within a valid timeframe.</summary>
        /// <returns>
        ///   <c>true</c> if the purchase date is valid; otherwise, <c>false</c>.</returns>
        private bool IsPurchaseDateValid()
        {
            DateTime earliest = new DateTime(2000, 1, 1);

            if (this.PurchaseDate > earliest && this.PurchaseDate <= DateTime.Now)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>Determines whether the linked activity is valid.</summary>
        /// <returns>
        ///   <c>true</c> if the linked activity is valid; otherwise, <c>false</c>.</returns>
        private bool IsLinkedActivityValid()
        {
            return true;
        }

        /// <summary>Determines whether the sports type is valid.</summary>
        /// <returns>
        ///   <c>true</c> if the sports type is valid; otherwise, <c>false</c>.</returns>
        private bool IsSportsTypeValid()
        {
            if (this.SportsType == null)
            {
                return true;
            }

            if (Enum.IsDefined(typeof(SportType), this.SportsType))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

        #region Validation Error Strings
        public static readonly string NameInvalid = "Expense name is invalid\n";
        public static readonly string StravaUserIDInvalid = "Strava user ID is invalid\n";
        public static readonly string AmountInvalid = "Expense amount must be a greater than 0 value\n";
        public static readonly string ExpenseTypeInvalid = "Expense type not found\n";
        public static readonly string PurchaseDateInvalid = "Purchase date must be within the supported timeframe (1/1/2000 - present)\n";
        public static readonly string LinkedActivityInvalid = "Expense linked activity is invalid\n";
        public static readonly string SportsTypeInvalid = "Sports type not found\n";
        #endregion

        #region Helper functions

        /// <summary>Auto-generates the expense's name</summary>
        public void AutoGenerateExpenseName()
        {
            Name = GenExpenseName(this.ExpenseType, this.PurchaseDate);
        }

        /// <summary>Performs generation of the name of the expense.</summary>
        /// <param name="expenseType">Type of expense.</param>
        /// <param name="purchaseDate">The purchase date.</param>
        /// <returns>The expense name.</returns>
        private string GenExpenseName(ExpenseType expenseType, DateTime purchaseDate)
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
