const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  userCreated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User-table', // Reference to the User table
    required: true
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BudgetTable', // Reference to the BudgetTable model
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//method to calculate the total expenses
expenseSchema.statics.getTotalExpenses = async function (userId) {
  try{
    const expenses = await this.find({ userCreated: userId });
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    return totalExpenses;
  }catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = mongoose.model('ExpenseTable', expenseSchema);
