import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postsFilterByUsers} from '../posts/postsSlice';
import Reaction from '../posts/Reaction';
import { formatDistanceToNow } from 'date-fns';

const UserPage = () => {

    const { authorName } = useParams();
    console.log(authorName)
    const posts = useSelector((state)=>postsFilterByUsers(state, authorName));

    return (
        <>
        <div className="posts-container">
        {posts &&
        <ul>
            {posts.map(post => (
             <article className='post'>
        <h5>{`${post.name}`}</h5>
        <h5>{`${formatDistanceToNow(new Date(post.time))} ago`}</h5>
          <h2>{post.title}</h2>
          <h4>
            {(post.body)?.length > 100
              ? `${post.body}`
              : post.body}
          </h4>
          <Reaction post={post} />
             </article>
            ))}
        </ul>}
        </div>
        </>
    );
};

export default UserPage;
