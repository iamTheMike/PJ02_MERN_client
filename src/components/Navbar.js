import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal  from "sweetalert2";
import {NavBlogDropdown,NavUserDropdown} from "./common"
import {PopUpLogin} from './'
import { getUser } from "../Service/FetchUser";



const Navbar=()=>{
    console.log("NavbarComponent")
    const token = sessionStorage.getItem('token')
    const [user,setUser] = useState("");
    const [isLoginPopupOpen,setIsLoginpopupOepn] = useState(false)
    const [menuActive,setMenuActive] = useState(false);
    const [blogDropdown,setBlogDropdown] = useState(false);
    const [userDropdown,setUserDropdown] = useState(false);
     
    //fn when is login page not show LOGIN
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        swal.fire({
            title: "Logged Out",
            text: "You have been logged out successfully.",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
          });
    };
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
   
return(
        <header>
            <nav className="navigation" >
                <span className="navigation-title">My Blog</span>
                <div className= {`menu-content-container ${menuActive ? 'menu-content-container-active' : ''}`}>
                    <ul className="menu-page" >
                            <li >
                                <Link to="/" onClick={()=>{setMenuActive(false);setBlogDropdown(false);setUserDropdown(false)}}  >Home</Link>
                            </li>
                            <li>
                                     <Link 
                                     onClick={()=>{setBlogDropdown(!blogDropdown);setUserDropdown(false)}}
                                     className={blogDropdown ? 'active-link-blog' : ''}
                                     >
                                        Blog
                                     </Link>
                                     
                                     { blogDropdown &&(
                                             <NavBlogDropdown 
                                             onClose={() => setBlogDropdown(!blogDropdown)  }
                                             menuClose={()=>setMenuActive(false)}/>
                                    )}
                                     
                            </li>   
                            {/* <li>
                                <Link to="/about-me" onClick={()=>{setMenuActive(false);setBlogDropdown(false);setUserDropdown(false)}}  >About Me</Link>
                            </li>
                            <li>
                                <Link to="/contact-us" onClick={()=>{setMenuActive(false);setBlogDropdown(false);setUserDropdown(false)}}  >Contact Me</Link>
                            </li> */}
                    </ul>
     {!user ? (
                    <ul className="menu-signin">
                            <li >
                                <Link  onClick={() => {setBlogDropdown(false);setMenuActive(false);setUserDropdown(false);setIsLoginpopupOepn(!isLoginPopupOpen)}}>SIGNIN</Link>
                            </li>     
                    </ul>
         ) : (
                   <ul className="menu-user">                         
                            <li  > 
                              <Link className="image-box"
                              onClick={()=>{setUserDropdown(!userDropdown);setBlogDropdown(false)}}     
                              >                   
                                    <img 
                                        src={user?.userImage} 
                                        alt="User"
                                        style={{ width: '32px', height: '32px', borderRadius: '50%', marginLeft: '10px' }} 
                                    />
                                    <li className="responsive-active">
                                        <div >{user?.userName}</div>       
                                    </li>
                              </Link> 
                             
                            </li>    
                            { userDropdown &&(
                                        <NavUserDropdown
                                            onClose={() => setUserDropdown(!userDropdown) } 
                                            menuClose={()=>setMenuActive(false)}
                                            Logout={()=>handleLogout()} 
                                            user={user}
                                        />
                                    )} 
                    </ul>                                                          
            )
        }                 
                </div>   
                <i className="ionicons icon ion-ios-menu" onClick={()=> {setMenuActive(!menuActive);setUserDropdown(false);setBlogDropdown(false)}}/>         
            </nav>  
           <PopUpLogin isOpen={isLoginPopupOpen} onClose={() => setIsLoginpopupOepn(false)} /> 
        </header>   
    )
}

export default Navbar;







