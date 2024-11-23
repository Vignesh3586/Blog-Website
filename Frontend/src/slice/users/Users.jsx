import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../posts/postsSlice'
import { Link } from 'react-router-dom'

const Users = () => {
  const posts= useSelector(selectAllPosts)


    const styledLinkElement={
      color:"#000000",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      textDecoration:"none",
    }

  
  const uniqueAuthors=posts.reduce((authors,post)=>{
    const findAuthor=authors.find(author=>author.authorName==post.name)
    if(!findAuthor){
      authors.push({id:authors.length?authors.length+1:1,
       authorName:post.name})
    }
    return authors
  },[])

  console.log(JSON.stringify(uniqueAuthors))
   
  const usersList = ()=>{
    return uniqueAuthors.length>0?(
      <>
      <ul>
        {uniqueAuthors.map(author => (
          <li  key={author.id}>
            <Link style={styledLinkElement} to={`${author.authorName}`}>{author.authorName}</Link>
          </li>
        ))}
        </ul>
        </>
    ):(
        <>
        <p>No users to display</p>
        </>
      )
 
  }
  


  return (
    <section id="users-container">
        {usersList()}
    </section>
  )
}

export default Users
