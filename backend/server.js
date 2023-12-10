const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const routes=require('./routes/route')
const port=3000

const app=express()

app.use(cors())


app.use(cookieParser())
app.use(express.json())

app.use("/api",routes)
//

mongoose.connect("mongodb+srv://spaul13:3wQNK5m1ovKtTSmZ@cluster0.msmrs2r.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
})
.then(()=>{
    console.log("connected to database")

    app.listen(port,()=>{
        console.log(`API listening to http://localhost:${port}`)
    })
})