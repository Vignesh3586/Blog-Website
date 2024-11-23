import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { selectAllPosts } from '../slice/posts/postsSlice'
import { formatDistanceToNow } from 'date-fns' // Ensure this import is present if you use it
import Reaction from '../slice/posts/Reaction'
import { memo } from 'react'


const PostPage = () => {
    const { id } = useParams()
    const posts = useSelector(selectAllPosts)
   
    const post = posts.find((post) => post._id == id)
    // If post is not found, you might want to handle this case (e.g., show a "Post not found" message)
    if (!post) {
        return <p>Post not found</p>
    }

    const styledLinkElement={
        color:"#1877F2",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        textDecoration:"none",
      }

    return (
        <>
        <section className="post-page-container">
            <div className="post-page">
            <div><i>{`Created by ${post.name}`}</i></div>
            <p>{`${formatDistanceToNow(new Date(post.time), { addSuffix: true })} ago`}</p>
            <h1>{post.title}</h1>
            <h3>{post.body}</h3>
            <Reaction post={post} />
            <Link style={styledLinkElement} to={`/editpost/${post._id}`}>Edit Post</Link>
            </div>
            </section>
        </>
    )
}

export default memo(PostPage)
