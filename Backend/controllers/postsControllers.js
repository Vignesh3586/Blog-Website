const Posts=require("../model/postsSchema")

async function addPost(req,res){
    const newPost=new Posts(req.body)
    console.log(req.body)
    try{
      const savedPost=await newPost.save()
      res.status(201).json(savedPost)    
    }catch(err){
      res.status(400).json({messge:err.messge})
    }
}

async function getAllPosts(req,res){
        try{
            const posts=await Posts.find()
            res.json(posts)
        }catch(err){
            res.status(500).json({messge:err})
        }
      }

async function updatePost(req,res){
  const {id}=req.params
  const {title,body,name,reactions}=req.body
  try{
    const updatedPost=await Posts.findByIdAndUpdate(
      id,
      {title,body,name,reactions},
      {new:true}
    )
    if(!updatedPost){
      res.status(404).json({messge:"Post not found"})
    }
    res.status(200).json(updatedPost)
  }catch(err){
    res.status(500).json({message:err.messsage})
  }
}

async function deletePost(req,res){
  const {id}=req.params
  try{
    const deletedPost=await Posts.findByIdAndDelete(id)
    if(!deletedPost){
      res.status(404).json({message:"Post not found"})
    }
    res.status(200).json(deletedPost)
  }catch(err){
    res.status(500).json({messge:err.messge})
  }
}

module.exports={addPost,getAllPosts,updatePost,deletePost}