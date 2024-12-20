import React, { useEffect, useState } from 'react'
import { Loading, NoUserForm } from '../components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert2';
import { getUser } from '../Service/FetchUser';


const Profile =  () => {
  console.log("ProfilePage")
  const [isLoading,setisLoading] = useState(false)
  const token = sessionStorage.getItem('token');
  const [user,setUser] = useState('');
  const {username} = useParams();  
  const [userData,setUserData]= useState(null);
  const navigate = useNavigate();
  const fetchData = async() =>{
    setisLoading(true);
         await axios.get(`${process.env.REACT_APP_API_USER}/profile/${username}`)
         .then(response => {
            setUserData(response.data)
         })
         .catch(error=>{
          if(error.response.data.message==="User not found"){
               swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    icon: "error",
                  }).then(result=>{
                      if(result.isConfirmed){
                        return navigate('/')
                      }
                  })
          }
         })
       }
  const fetchUser = async () => {
    setisLoading(true);
        if (token) {
            try {
                let userData = await getUser();  // เรียกฟังก์ชันที่ดึงข้อมูล
                setUser(userData.user); 
                
                // อัปเดต state
            } catch (error) {
                
                console.log("Error fetching user data:", error);
            }
        }
     };
     const fetching =async()=>{
      await fetchUser(); 
      await fetchData();    
      setisLoading(false);
     }  
   useEffect(()=>{
    fetching();
     // eslint-disable-next-line react-hooks/exhaustive-deps
   },[username,token])  

   console.log("userToken",user);  
  console.log("userDataPara",userData);
  
  return (
    <main>
      {isLoading&& <Loading ></Loading>}
        <content   className="profile">
        <NoUserForm userData={userData} />
        {user.userName===username &&
          <div className='btn-box'>
            <Link className='btn btn-info btn-block btn-round' to={`/edit-profile/${username}`} >Edit</Link>
          </div>
          }
       
        </content>
       

      
    </main>
    
  )
}

export default Profile