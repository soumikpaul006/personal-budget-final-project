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

//method to calculate the total budget
budgetSchema.statics.getTotalBudget = async function (userId) {
  try {
    const budgets = await this.find({ userCreated: userId });
    const totalBudget = budgets.reduce((total, budget) => total + budget.amount, 0);
    return totalBudget;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = mongoose.model('BudgetTable', budgetSchema);
