const Users=require("../model/usersSchema")

async function getAllUsers(req,res){
    try{
        const users=await Users.find()
        res.json(users)
    }catch(err){
        res.status(500).json({messge:err.messge})
    }
  
}

async function addUser(req,res){
        const newUser=new Users(req.body)
        try{
          const savedUser=await newUser.save()
          res.status(201).json(savedUser)    
        }catch(err){
          res.status(400).json({messge:err.messge})
        }
}

async function updateUser(req,res){
  const {id}=req.params
  const {userId,name}=req.body
  try{
  const updatedUser=await Users.findByIdAndUpdate(
    id,
    {userId,name},
    {new:true}
  )
  if(!updatedUser){
    res.status(404).json({messge:"User not found"})
  }
  res.json(updatedUser)
}catch(err){
  res.status(500).json({message:err.messge})
}
}

async function deleteUser(req,res){
  const {id}=req.params
  try{
    const deletedPost=await Users.findByIdAndDelete(id)
    if(!deletedPost) {
      res.status(404).json({message:"User not found"})
    }
    res.status(200).json(deletedPost)
  }catch(err){
    res.status(500).json({messge:err.message})
  }
}
module.exports={addUser,getAllUsers,deleteUser,updateUser}