import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import {Navbar} from "./components";
import PageRender from "./Service/PageRender";
import { Blog,EditBlog,GoogleCallback,Profile,NotFound, EditProfile } from "./Pages";
import UserRequire from "./Service/UserRequire"
import { useEffect, useState } from "react";
import { getUser } from "./Service/FetchUser";


const MyRoute = () => {
    console.log("AppJs");
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

  return (
    <Router>
        <Routes>
            <Route element={ <><Navbar/><Outlet/></>}>
                <Route path='/:page' element={<PageRender  />}/>
                <Route path='/' element={<Navigate to="/home" />} />
                <Route path="/blog/:slug" element={<Blog/>} />
                <Route path="/profile/:username" element={<Profile/>} />
                <Route element={<UserRequire user={user}/>}>
                      <Route path="/edit-blog/:slug" element={<EditBlog />} />
                      <Route path="/edit-profile/:username" element={<EditProfile  />} />
                </Route> 
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path={process.env.REACT_APP_GOOGLE_REDIRECT_URI} element={<GoogleCallback/>}/>
        </Routes>
    </Router>
  );
};

export default MyRoute;


