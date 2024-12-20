const NoUserForm = ({userData}) => {
  console.log("NoUserFormComponent")
  return (
    <form >
    <div className='profile-container'>
        <div className='content-left'>
          <div className='image-box'>
          <h4>Avatar</h4>
          <div className='image-user'>
              <img 
                src={userData?.userImage ?( userData?.userImage):('https://pixy.org/src/120/thumbs350/1206832.jpg')} 
                alt="User"
               
              />
            <div>
            <i class='bx bx-camera'></i>
            </div>
          </div>
          </div>
          <div className='bio-box'>
            <h4>Bio</h4>
            <textarea type='text' value={userData?.bio ? userData?.bio: '- No Data -'} disabled={true} ></textarea>
          </div>
        </div>
        
        <div className='content-right'>
          
            <div className='username-box mb-3'>
              <h4>User</h4>
              <p type='text' >{userData?.userName ? (userData?.userName):'- No Data -'}</p>
            </div>
              <div className='fist-name-box mb-3'>
                <h4>First Name</h4>
                <p type='text' >{userData?.firstName ? (userData?.firstName):'- No Data -'}</p>
              </div>
              <div className='last-name-box mb-3'>
                <h4>Last Name</h4>
                <p type='text' >{userData?.lastName ? (userData?.lastName):"- No Data -"}</p>
              </div>
            <div className='birthdate-box mb-3'>
              <h4>Birthdate</h4>
              <div className=''>
              <p type='text' >{userData?.birthDate ? userData?.birthDate:'- No data -'}</p>
              </div>
            </div>
          <div className='address-box mb-3'>
            <h4>Adress</h4>
            <textarea type='text' value={userData?.address ? userData?.address: '- No Data -'} disabled={true}></textarea>
          </div>
        </div>
    </div>
    </form>
  )
}

export default NoUserForm