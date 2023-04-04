const express= require("express")
const cors= require("cors")
const { userRouter } = require("./routes/user.route")
const { connection } = require("./config/db")



const app= express()

// to convert into json if any
app.use(express.json())

//cross origin resource sharing
app.use(cors({
origin :"*"
}))

app.use("/user", userRouter)

app.listen(process.env.PORT,async()=>{
    try{
await connection
console.log("connected to mongodb")
    }
    catch{
        console.log("can not connect to mongodb")

    }

    console.log("server is running")
})