import React, { useEffect, useState } from 'react'
import { Loading, NoUserForm, UserForm } from '../components'
import axios from 'axios';
import { getUser } from '../Service/FetchUser';
import { useParams } from 'react-router-dom';


const EditProfile = () => {
  const [isLoading, setisLoading] = useState(false)
  const { username } = useParams();
  const token = sessionStorage.getItem('token');
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState(null);
  const fetchData = async () => {
    setisLoading(true)
    await axios.get(`${process.env.REACT_APP_API_USER}/profile/${username}`)
      .then(response => {
        setUserData(response.data)
      })
  }
  const fetchUser = async () => {
    setisLoading(true)
    if (token) {
      try {
        let userData = await getUser();  
        setUser(userData.user);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    }
  };

  const fetching = async () => {
    await fetchUser();
    await fetchData();
    setisLoading(false);
  }


  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps     
  }, [token])
  return (
    <main>
      {isLoading && <Loading ></Loading>}
      <content>
        {userData && user ? (
          userData.userName !== user.userName ? (
            <NoUserForm userData={userData} />
          ) : (
            <UserForm userData={userData} />
          )
        ) : (
          <></>
        )}
      </content>
    </main>
  )
}

export default EditProfile