const express=require("express")
const mongoose=require('mongoose')
const cors=require('cors')
const PORT=process.env.port || 3000 
require('dotenv').config()
const app=express()
const {addPost,getAllPosts,updatePost,deletePost}=require('./controllers/postsControllers')


app.use(express.json())
app.use(cors())

const DB_URL=process.env.DB_URL
console.log(DB_URL)

mongoose.connect(DB_URL).then(()=>console.log('connected to mongodb'))
.catch(err=>console.error(err))

app.get('/',(req,res)=>{
    res.send('Backend Server')
})

app.get("/posts",getAllPosts)
app.post("/posts",addPost)
app.put("/posts/:id",updatePost)
app.delete("/posts/:id",deletePost)




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})