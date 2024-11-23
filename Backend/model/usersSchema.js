const mongoose=require('mongoose')

const usersSchema=new mongoose.Schema({
    userId:Number,
    name:String,
})

module.exports=mongoose.model('users',usersSchema)