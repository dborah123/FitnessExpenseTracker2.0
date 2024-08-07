﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessExpenseTracker;
using FitnessExpenseTracker.Models;
using Microsoft.IdentityModel.Tokens;

namespace FitnessExpenseTracker2._0.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExpensesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpense()
        {
            return await _context.Expense.ToListAsync();
        }

        // GET: api/Expenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            var expense = await _context.Expense.FindAsync(id);

            if (expense == null)
            {
                return NotFound();
            }

            return expense;
        }
        // GET: api/Expenses/user/1
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<Expense>>> GetExpenseForUser(int userId)
        {
            var expenseList = await _context.Database.SqlQuery<Expense>($"SELECT * FROM Expenses WHERE StravaUserID={userId}").ToListAsync();

            if (expenseList.IsNullOrEmpty())
            {
                return NotFound();
            }

            return expenseList;
        }

        // GET: api/Expenses/activity/1
        [HttpGet("activity/{activity}")]
        public async Task<ActionResult<List<Expense>>> GetExpenseForActivity(string activity)
        {
            var expenseList = await _context.Database.SqlQuery<Expense>($"SELECT * FROM Expenses WHERE LinkedActivity={activity}").ToListAsync();
            if (expenseList.Count() == 0)
            {
                object? value = null;
                return Ok(value);
            }
            return expenseList;
        }

        // PUT: api/Expenses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense(int id, Expense expense)
        {
            if (id != expense.Id)
            {
                return BadRequest();
            }
            string errorString;
            if (!expense.IsExpenseValid(out errorString))
            {
                BadRequest(errorString);
            }

            _context.Entry(expense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Expenses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Expense>> PostExpense(Expense expense)
        {
            string errorString;
            if (!expense.IsExpenseValid(out errorString, true))
            {
                BadRequest(errorString);
            }

            _context.Expense.Add(expense);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpense", new { id = expense.Id }, expense);
        }

        // DELETE: api/Expenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var expense = await _context.Expense.FindAsync(id);
            if (expense == null)
            {
                return NotFound();
            }

            _context.Expense.Remove(expense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExpenseExists(int id)
        {
            return _context.Expense.Any(e => e.Id == id);
        }
    }
}
