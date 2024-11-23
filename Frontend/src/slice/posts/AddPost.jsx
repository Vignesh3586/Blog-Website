import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from './postsSlice'
import {  useNavigate} from 'react-router-dom'
import { sub } from 'date-fns';


const AddPost = () => {
   const [postTitle, setPostTitle] = useState("")
   const [postDetails, setPostDetails] = useState("")
   const [author, setAuthor] = useState('')
   const navigate=useNavigate()

   const dispatch = useDispatch()


   const changePostTitle = (e) => setPostTitle(e.target.value)
   const changePostDetails = (e) => setPostDetails(e.target.value)
   const onUserChanged = (e) => setAuthor(e.target.value)


   const canSave = postTitle && postDetails && author

   const addPostHandler = () => {
     if (canSave) {
       try {
        const newPost={
          title: postTitle,
          body: postDetails,
          name:author,
          time :Date.now(),
          reactions :{
              like: 0,
              dislike: 0,
              heart: 0,
            }   
        }
         dispatch(addPost(newPost))
         setPostTitle("")
         setPostDetails("")
         setAuthor("")
         navigate("/")
       } catch (err) {
         console.error("Failed to save the post", err)
       }
     }
   }

   return (
     <section className='add-post-container'>
      <div className="add-post">
       <h1>Add Post</h1>
       <label htmlFor="postTitle">Post Title:</label>
       <input
         type='text'
         id="postTitle"
         value={postTitle}
         onChange={changePostTitle}
       />
      
       <label htmlFor="author-name">Author Name:</label>
       <input
         type='text'
         id="author-name"
         value={author}
         onChange={onUserChanged}
       />
       <label htmlFor="postDetails">Post Details:</label>
       <textarea
         type='text'
         id="postDetails"
         value={postDetails}
         onChange={changePostDetails}
       />
       
       <button 
         onClick={addPostHandler} 
         type='button'
         disabled={!canSave}
       >
         Add Post
       </button>
       </div>
     </section>
   )
}

export default AddPost
