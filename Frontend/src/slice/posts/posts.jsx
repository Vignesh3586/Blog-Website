import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { selectAllPosts } from './postsSlice'
import Post from './Post'
import { memo } from 'react'

const Posts = () => {

  const posts=useSelector(selectAllPosts)
  const postStatus=useSelector((state => state.posts.status))
  const postError=useSelector((state => state.posts.error))
  console.log(posts)

  const content=()=>{
    if(postStatus=="pending"){
    return(
      <p>Loding.....</p>
    )
  }else if(postStatus=="fulfilled"){
    return(
      posts.length>0 ?
     posts.map((post)=>(
    <ul key={post._id}>
       <Post postId={post._id}/> 
    </ul>
  )
  ):(
    <p>No posts to display</p>
  )
)}else if(postStatus=="rejected"){
    return(
      <p>{postError}</p>
    )
  }
}

  return (
    <div className='posts-container'>
    {content()}
    </div>
  )

}
export default memo(Posts)