import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAllPosts, editPost, deletePost } from '../slice/posts/postsSlice'


const EditPostPage = () => {
    const posts = useSelector(selectAllPosts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    console.log(id)
    // Find the post with the matching id
    const post = posts.find((post) => post._id ==id)

    // Initialize state with current post values
    const [editTitle, setEditTitle] = useState(post?.title || "")
    const [editDetails, setEditDetails] = useState(post?.body || "")
    const [editAuthor, setEditAuthor] = useState(post?.name || "")

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditDetails(post.body)
            setEditAuthor(post.name)
        }
    }, [post])

    const changePostTitle = (e) => setEditTitle(e.target.value)
    const changePostDetails = (e) => setEditDetails(e.target.value)
    const onUserChanged = (e) => setEditAuthor(e.target.value)

    const editPostHandler = () => {
        if (editTitle && editDetails && editAuthor) {
            dispatch(editPost({
                id: post._id,
                title: editTitle,
                body: editDetails,
                name: editAuthor,
            }))
            navigate(`/post/${post._id}`)
        }
    }

    const deletePostHandler = () => {
        dispatch(deletePost({ id: post._id }))
        navigate("/")
    }


    if (!post) {
        return <p>Post not found</p>
    }

    return (
        <section className='edit-post-container'>
            <div className="edit-post">
            <h1>Edit Post</h1>
            <label htmlFor="editTitle">Post Title:</label>
            <input
                type="text"
                id="editTitle"
                value={editTitle}
                onChange={changePostTitle}
            />

       <label htmlFor="author-name">Author Name</label>
       <input
         type='text'
         id="author-name"
         value={editAuthor}
         onChange={onUserChanged}
       />

            <label htmlFor="editPostDetails">Post Details:</label>
            <textarea
                id="editPostDetails"
                value={editDetails}
                onChange={changePostDetails}
            />

            <button onClick={editPostHandler}>
                Save Post
            </button>
            <button onClick={deletePostHandler}>
                Delete Post
            </button>
            </div>
        </section>
    )
}

export default EditPostPage
