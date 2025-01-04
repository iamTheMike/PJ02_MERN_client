import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PopUpLogin from "../components/PopUpLogin";



const UserRequire = () => {
  const [isLoginPopupOpen, setIsLoginpopupOepn] = useState(true);
  const token = sessionStorage.getItem('token');
  const exit = () => {
    if (!token) {
      setIsLoginpopupOepn(false);
      window.location.reload();
    }
  }
  return token ? <Outlet />
    :
    <div>
      <Outlet />
      {isLoginPopupOpen && <header><PopUpLogin
        isOpen={isLoginPopupOpen}
        onClose={exit}
      />
      </header>}
    </div>
};

export default UserRequire;
