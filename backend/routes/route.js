const {Router}=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/user')
const router=Router()


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
})

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
})

//logout route
router.post('/logout',async(req,res)=>{
   res.cookie("jwt","",{maxAge:0});

   res.send({
        message:"success"
   });
})

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

module.exports=router