const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number, 
    required: true
  },
  userCreated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User-table', 
    required: true
  }
});

module.exports = mongoose.model('BudgetTable', budgetSchema);
