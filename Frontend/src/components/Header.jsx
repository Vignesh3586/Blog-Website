import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const styledLinkElement={
    color:"#FFFFFF",
    fontFamily:"Anton, sans-serif",
    textDecoration:"none",
    padding:"auto 20px",
  }
  return (
    <>
      <div className='header'>Redux Blog</div>
      <ul className='nav-bar'>
        <li><Link style={styledLinkElement} to="/">Posts</Link></li>
        <li><Link style={styledLinkElement} to="/addpost">Add Post</Link></li>
        <li><Link style={styledLinkElement} to="/about">About</Link></li>
        <li><Link style={styledLinkElement} to="/users">Users</Link></li>
      </ul>
    </>
  )
}

export default Header
