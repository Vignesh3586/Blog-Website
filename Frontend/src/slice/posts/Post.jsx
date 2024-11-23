import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Reaction from './Reaction';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

const Post = ({ postId }) => {

  console.log(typeof postId)
  // Select the post from Redux store using the selector and postId
  const post = useSelector((state) => selectPostById(state, postId));
  const styledLinkElement={
    color:"#1877F2",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    textDecoration:"none",
  }
  return (
    <>
      {post ? (
        <article className='post'>
        <h5>{`${post.name}`}</h5>
        <h5>{`${formatDistanceToNow(new Date(post.time))} ago`}</h5>
          <h2>{post.title}</h2>
          <h4>
            {(post.body)?.length > 100
              ? `${post.body.slice(0,100)}...`
              : post.body}
          </h4>
          <Link style={styledLinkElement} to={`/post/${post._id}`}>View Post</Link>
          <Reaction post={post} />
        </article>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Post;
