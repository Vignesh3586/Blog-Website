const mongoose=require("mongoose")

const reactionsSchema=new mongoose.Schema({
    like:Number,
    dislike:Number,
    heart:Number
})

const postsSchema=new mongoose.Schema({
    title:String,
    body:String,
    name:String,
    time:{
        type:Date,
        default:Date.now()
    },
    reactions:reactionsSchema
})

module.exports=mongoose.model('posts',postsSchema)