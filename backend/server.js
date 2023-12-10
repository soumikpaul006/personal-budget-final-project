const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const routes=require('./routes/route')
const port=3000

const app=express()

app.use(cors({
    origin:['http://localhost:4200'],
    credentials:true
}))


app.use(cookieParser())
app.use(express.json())

app.use("/api",routes)

mongoose.connect("mongodb://127.0.0.1:27017/personal-budget-db",{
    useNewUrlParser:true,
})
.then(()=>{
    console.log("connected to database")

    app.listen(port,()=>{
        console.log(`API listening to http://localhost:${port}`)
    })
})