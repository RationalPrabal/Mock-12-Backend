const express= require("express")
const { userModel } = require("../models/user.model")
const userRouter= express.Router()

//!regsitration

userRouter.post("/register",async(req,res)=>{
try{
req.body.created_at=new Date()
    let newUser= new userModel(req.body)
    await newUser.save()
    res.send("user has been registered")
}
catch(e){
    throw e
}
})

//!login

userRouter.post("/login",async(req,res)=>{
let email= req.body.email
try{
let user=await userModel.find({email})
if(user){
    if(req.body.password==user[0].password){
        res.send({message:"Login Success", id:user[0].id})
    }
    else{
        res.send("please enter correct password")
    }
}
else{
    res.send("please enter correct email")
}
}
catch(e){
throw e
}
})

userRouter.post("/getProfile",async(req,res)=>{
    let id= req.body.id
    try{
    let user=await userModel.findById(id)
    if(user){
          res.send(user)
        
    }
   
    }
    catch(e){
    throw e
    }
    })


    userRouter.post("/calculate",async(req,res)=>{
        let {amount,time,roi}= req.body
       let totalInvestedAmount= amount*time
       let i=+roi/100
       let core= ((1+i)**time).toFixed(2)
      
       let totalMaturityValue= ((core-1)*amount/i).toFixed(2)
       let interest= totalMaturityValue-totalInvestedAmount
try{
       res.send({
        totalInvestedAmount,totalMaturityValue,interest
       })
}
catch(e){
    throw e
}
    })
module.exports={
    userRouter
}
