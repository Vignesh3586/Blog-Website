import React from 'react'

const Footer = () => {
  const currentYear=new Date().getFullYear()

  return (
    <div id="footer">{`CopyRight${'\u00A9'}${currentYear}`}</div>

  )
}

export default Footer