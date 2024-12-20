import React, { useState } from "react";
import { Outlet} from "react-router-dom";
import PopUpLogin from "../components/PopUpLogin";


const UserRequire = ({user}) => {
  const [isLoginPopupOpen,setIsLoginpopupOepn] = useState(true);
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
