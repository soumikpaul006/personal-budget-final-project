const {Router}=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/user')
const BudgetTable=require('../models/Budget')
const ExpenseTable=require('../models/Expense')
const router=Router()




// Middleware function to check if JWT token is valid
const jwtCheck = (req, res, next) => {
  const token = req.headers['x-access-token']|| req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'secret');     
    const user = User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    req.userName=user.name;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};













////CRUD api's for my Budget collections
// Create a budget
router.post('/budgets', jwtCheck, async (req, res) => {
    try {
      const { title, amount } = req.body;
  
      const newBudget = new BudgetTable({
        title,
        amount,
        userCreated: req.user._id, 
      });
  
      const savedBudget = await newBudget.save();
  
      res.status(201).json(savedBudget);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Get all budgets
  router.get('/budgets', jwtCheck, async (req, res) => {
    try {
      const budgets = await BudgetTable.find({ userCreated: req.user._id });
      res.json(budgets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Update a budget by ID
  router.put('/budgets/:id', jwtCheck, async (req, res) => {
    try {
      const { title, amount } = req.body;
  
      const updatedBudget = await BudgetTable.findByIdAndUpdate(
        req.params.id,
        {
          title,
          amount,
        },
        { new: true }
      );
  
      if (!updatedBudget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
  
      res.json(updatedBudget);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Delete a budget by ID
  router.delete('/budgets/:id', jwtCheck, async (req, res) => {
    try {
      const deletedBudget = await BudgetTable.findByIdAndDelete(req.params.id);
  
      if (!deletedBudget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
  
      res.json({ message: 'Budget deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });












////CRUD api's for Expense Collections
// Create an expense
router.post('/expenses', jwtCheck, async (req, res) => {
    try {
      const { amount, comment, budget } = req.body;
  
      const newExpense = new ExpenseTable({
        amount,
        comment,
        userCreated: req.user._id,
        budget,
      });
  
      const savedExpense = await newExpense.save();
  
      res.status(201).json(savedExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Get all expenses
  router.get('/expenses', jwtCheck, async (req, res) => {
    try {
      const expenses = await ExpenseTable.find({ userCreated: req.user._id })
      .populate('budget');
      res.json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Update an expense by ID
  router.put('/expenses/:id', jwtCheck, async (req, res) => {
    try {
      const { amount, comment, budget } = req.body;
  
      const updatedExpense = await ExpenseTable.findByIdAndUpdate(
        req.params.id,
        {
          amount,
          comment,
          budget,
        },
        { new: true }
      );
  
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.json(updatedExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Delete an expense by ID
  router.delete('/expenses/:id', jwtCheck, async (req, res) => {
    try {
      const deletedExpense = await ExpenseTable.findByIdAndDelete(req.params.id);
  
      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  ///total budget and total expenses

  // Get total budget for a user
  router.get('/budgets/total',jwtCheck, async (req, res) => {
    try {
      const totalBudget = await BudgetTable.getTotalBudget(req.user._id);
      res.json({ totalBudget });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Get total expenses for a user
router.get('/expenses/total',jwtCheck, async (req, res) => {
  try {
    const totalExpenses = await ExpenseTable.getTotalExpenses(req.user._id);
    res.json({ totalExpenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Get monthly expenses
router.get('/expenses/monthly', jwtCheck, async (req, res) => {
  try {
    const totalExpensesByMonth = {};
    const allExpenses = await ExpenseTable.find({ userCreated: req.user._id});

    allExpenses.forEach((expense) => {
      const monthYear = expense.date.toISOString().slice(0, 7);
      if (!totalExpensesByMonth[monthYear]) {
        totalExpensesByMonth[monthYear] = 0;
      }
      totalExpensesByMonth[monthYear] += expense.amount;
    });

    res.json(totalExpensesByMonth);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});






//register route
router.post('/register', async(req,res)=>{

    let email=req.body.email
    let password=req.body.password
    let name=req.body.name

    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const record= await User.findOne({email:email});

    if(record)
    {
        return res.status(400).send({
            message:"Your email is already registered"
        });
    }else{
        const user = new User({
            name:name,
            email:email,
            password:hashedPassword
        });

        const result=await user.save();

        //JWT Token
        const {_id} =await result.toJSON();
        const token=jwt.sign({_id:_id},"secret");
        res.send({
            message:"success",
            token:token,
            user:user.name
        });
    }
});

//Login route
router.post('/login', async(req,res)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user)
    {
        return res.status(404).send({
            message:"User not found"
        });
    }

    if(!(await bcrypt.compare(req.body.password,user.password)))
    {
        return res.status(400).send({
            message:"Password is incorrect"
        });
    }

    const token=jwt.sign({_id:user._id},"secret");
console.log(user.name)
    res.send({
        message:"success",
        token:token,
        user: user.name
    });
});

//logout route
router.post('/logout', async(req,res)=>{
   res.send({
        message:"success"
   });
});



module.exports = jwtCheck;
module.exports=router