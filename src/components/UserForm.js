import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { BirthdatePicker } from './common';
import swal from 'sweetalert2';
import axios from 'axios';
import Loading from './Loading';

const convertToDateObject = (dateString) => {
  if (!dateString) {
    return null;  
  }
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};


const UserForm = ({userData}) => {
  const [isLoading,setisLoading] = useState(false)
   console.log("UserFormComponent")
  const navigator = useNavigate();
   const token = sessionStorage.getItem('token')
     const [user,setUser] =  useState({
      id:"",
      userName:"",
      firstName:"",
      lastName:"",
      bio:"",
      address:""
     });

     const {id,userName,firstName,lastName,bio,address} = user;
     const [birthDate,setBirthDate] = useState('')
     const [userImage,setUserImage] = useState('')
     const [previewImage, setPreviewImage] = useState('');
    
     useEffect(()=>{
      setUser({...user,...userData});
      setPreviewImage(userData?.userImage);
      setBirthDate(convertToDateObject(user?.birthDate))
       // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [userData,token])
    
     const inputValue =(name) => (e) =>{
      setUser({...user,[name]:e.target.value})
     }
     const userImageValue = (e) =>{
      const file = e.target.files[0];
      if (file) {
        setUserImage(file); 
        setPreviewImage(URL.createObjectURL(file)); 
      }
    }

     const onSubmit = async(e)=>{
      setisLoading(true);
     const editBirthDate  = new Intl.DateTimeFormat('en-GB', 
        { year: 'numeric', month: '2-digit', day: '2-digit' 
        }).format(birthDate)
      e.preventDefault();
      if(!userName){
       
        swal.fire({
          title: "Warning",
          text: "Username cannot be empty",
          icon: "error"
       })
       return;
      }
        const formData = new FormData();
        formData.append("userid",id);
        formData.append("firstName",firstName);
        formData.append("lastName",lastName);
        formData.append("birthDate",editBirthDate);
        formData.append("address",address);
        formData.append("bio",bio);
        if(userData?.userName!==userName){
          formData.append("userName",userName);
        }else{
          formData.append("userName",'');
        }
        if(userData?.userImage!==userImage){
          formData.append("userImage",userImage);
        }else{
          formData.append("userImage",'');
        }
      
       
        await axios.post(`${process.env.REACT_APP_API_USER}/creat-profile`,formData,{ 
          headers: {
              Authorization: `Bearer ${token}`
          }
        }).then(response=>{
          if(response.data?.token){
          sessionStorage.setItem('token',response.data.token)
          }
         
          swal.fire({
              title: "Complete",
              text: "Update data complete",
              icon: "success"    
              })
          navigator(`/profile/${userName}`)     
        }).catch(err=>{ 
          swal.fire({
               title: "Error",
               text: err.response.data.message,
               icon: "error",
             }).then(result=>{
              if(result.isConfirmed){
                window.location.reload();
              }
             })
          
        })



      
    
      
     }

  return (
    
    <form onSubmit={onSubmit}>
      {isLoading&& <Loading ></Loading>}
    <div className='profile-container'>
        <div className='content-left'>
          <div className='image-box'>
          <h4>Avatar</h4>
          <div className='image-user'>
            <img 
              src={previewImage} 
              alt="User"
            />
          
           
            <input 
              className="input-camera" 
              type="file" 
              id="file" 
              accept=".png, .jpg, .jpeg"                                 
              placeholder="Your Avatar..."
              onChange={userImageValue}
              />
            <label for="file" className ="uploadbtn"><i className='bx bx-camera'/></label>
           
            
          </div>
          </div>
          <div className='bio-box'>
            <h4>Bio</h4>
            <textarea type='text' onChange={inputValue("bio")} value={user?.bio} ></textarea>
          </div>
        </div>
        
        <div className='content-right'>
          
            <div className='username-box mb-3'>
              <h4>User</h4>
              <input type='text'  onChange={inputValue("userName")} value={user?.userName}></input>
            </div>
              <div className='fist-name-box mb-3'>
                <h4>First Name</h4>
                <input type='text' onChange={inputValue("firstName")} value={user?.firstName} ></input>
              </div>
              <div className='last-name-box mb-3'>
                <h4>Last Name</h4>
                <input type='text' onChange={inputValue("lastName")} value={user?.lastName} ></input>
              </div>
            <div className='birthdate-box mb-3'>
              <h4>Birthdath</h4>
              <div className=''>
                <label>
                <DatePicker 
                  selected={birthDate} 
                  onChange={date=>setBirthDate(date)} 
                  customInput={<BirthdatePicker />}
                  showYearDropdown
                  yearDropdownItemNumber={50} 
                  scrollableYearDropdown
                  dateFormat="dd/MM/yyyy" 
                  />
                </label>
              </div>
            </div>
          <div className='address-box mb-3'>
            <h4>Address</h4>
            <textarea type='text'onChange={inputValue("address")} value={user?.address} ></textarea>
          </div>
          <button className='btn btn-info btn-block btn-round '>Submit</button>
        </div>
    </div>
    </form>
  )
}

export default UserForm