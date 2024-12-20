import React from 'react'
import { Link } from 'react-router-dom'

const NavUserDropdown = ({onClose,Logout,menuClose,user}) => {
 
  return (
    <div className='user-dropdown-box'>
        <div className='user-dropdown-content'>
          <div className='userbox'>
             <h4>{user.userName}</h4>
          </div>
          <Link to={`/profile/${user.userName}`} onClick={()=>{onClose();menuClose()}}>Profile</Link>
          <Link  onClick={()=>{onClose();menuClose();Logout()}}>Logout</Link>
        </div>
    </div>
  )
}

export default NavUserDropdown