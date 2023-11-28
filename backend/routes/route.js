const {Router}=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/user')
const BudgetTable=require('../models/Budget')
const ExpenseTable=require('../models/Expense')
const router=Router()










// Middleware function to check if JWT token is valid
const jwtCheck = (req, res, next) => {
  // Get the JWT token from the cookie
  const token = req.cookies.jwt;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'secret'); // Make sure to use the same secret as used during token creation

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();

  } catch (error) {
    // Token verification failed
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
        userCreated: req.user._id, // Assuming user information is attached by jwtCheck middleware
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
        userCreated: req.user._id, // Assuming user information is attached by jwtCheck middleware
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
        
        res.cookie("jwt",token,{
            httpOnly:true,
            maxAge: 24*60*60*1000
        });

        res.send({
            message:"success"
        });
    }
});

//Login route
router.post('/login', async(req,res)=>{

    const user=await User.findOne({email:req.body.email});

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

    res.cookie("jwt",token,{
        httpOnly: true,
        maxAge:24*60*60*1000
    });

    res.send({
        message:"success",
    });
});

//logout route
router.post('/logout',async(req,res)=>{
   res.cookie("jwt","",{maxAge:0});

   res.send({
        message:"success"
   });
});

//it will tell the user is authenticated or not
router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];

        // Check if the JWT cookie is present
        if (!cookie) {
            return res.status(401).send({
                message: "No JWT cookie founds. Unauthorized entry"
            });
        }

        const claims = jwt.verify(cookie, "secret");
        console.log(claims);

        // Check if claims are present
        if (!claims) {
            return res.status(401).send({
                message: "Invalid JWT. Unauthorized entry"
            });
        }

        // Find user based on the claims
        const user = await User.findOne({_id:claims._id});

        if (!user) {
            return res.status(401).send({
                message: "User not found. Unauthorized entry"
            });
        }

        // Omit the password from the response
        const { password, ...data } = await user.toJSON();

        res.send(data);
    } catch (err) {
        // Log the error for debugging purposes
        console.error(err);

        return res.status(401).send({
            message: "Error during authentication"
        });
    }
});


module.exports = jwtCheck;
module.exports=router