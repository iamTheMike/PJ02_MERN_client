import React, { useEffect, useState } from "react";
import { Outlet} from "react-router-dom";
import PopUpLogin from "../components/PopUpLogin";
import { getUser } from "./FetchUser";


const UserRequire = () => {
  const [isLoginPopupOpen,setIsLoginpopupOepn] = useState(true);
  const [user,setUser] = useState("");
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
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
fetchUser();
}, [token]); 

  const exit = () =>{
    if(!user){
    setIsLoginpopupOepn(false);
    window.location.reload();
    }
  }
  return user ? <Outlet /> 
                              :     
                                    <div>
                                        <Outlet  />
                                        {isLoginPopupOpen && <header><PopUpLogin 
                                                                     isOpen={isLoginPopupOpen} 
                                                                     onClose={exit}                               
                                                                     />
                                                            </header>}
                                    </div>
};

export default UserRequire ;
