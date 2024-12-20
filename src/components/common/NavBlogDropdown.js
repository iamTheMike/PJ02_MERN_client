import React from 'react'
import { Link } from 'react-router-dom'



const NavBlogDropdown = ({onClose,menuClose}) => {
  return (
  <div className='blog-dropdown-box'>
     <div className='blog-dropdown-content'>
        <Link to="/blogs" onClick={()=>{onClose();menuClose()}}>Blogs</Link>
        <Link to="/form-blog" onClick={()=>{onClose();menuClose()}}>Creat Blog</Link>
     </div>
  </div>
  )
}

export default NavBlogDropdown