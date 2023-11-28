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

module.exports = mongoose.model('ExpenseTable', expenseSchema);
