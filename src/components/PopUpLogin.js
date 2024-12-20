import {  useState } from "react"
import axios from "axios"
import swal from "sweetalert2"
import { Link } from "react-router-dom"



const PopUpLogin = ({isOpen,onClose}) => {
    //Initialization parameter
    const [state,setState] = useState({
      userName:"",
      userEmail:"",
      password:"",
      confirmPassword:""
    })
    const [userImage,setUserImage] = useState("")
    const [loading, setLoading] = useState(false);
    const [isOTPPopupOpen, setIsOTPpopupOpen] = useState(false)
    const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false)
    const [otp,setOtp] = useState("")
    const {userName,userEmail,password,confirmPassword} = state;


    const token = sessionStorage.getItem('token');
    const inputValue = (name)=>(e) =>{
      setState({...state,[name]:e.target.value})
    }
    const userImageValue = (e) =>{
      setUserImage(e.target.files[0])
    }
    const otpInput = (e) =>{
      setOtp(e.target.value)
    }
    
    const validateInputs = async (email,pass) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      if(email ==='admin'){
         return true;
      }
      if (!emailRegex.test(email)) {
        swal.fire({
          title: "Invalid Email",
          text: "Please enter a valid email address.",
          icon: "warning",
        });
        return false;
      }
      if (pass.trim() === "") {
        swal.fire({
          title: "Invalid Password",
          text: "Password cannot be empty.",
          icon: "warning",
        });
        return false;
      }
      return true;
    };
   //------------------LOCAL LOGIN-------------------//
    //verify input cannot use specail charector 
    const loginHandle =  async (e) =>{
      e.preventDefault();
      const checkInput = await validateInputs(userEmail,password);
      if (!checkInput) return; 
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_API_USER}/login`,{userEmail,password})
      .then(response=>{
        //admin check, if admin not otp verify
        if(response.data.role === 'admin'){
          sessionStorage.setItem('token', response.data.token);
          swal.fire({
            title: "Complete",
            text: "Welcome Administrator",
            icon: "success"    
          }).then((result)=>{
            if(result.isConfirmed){
            onClose();
            window.location.reload();   
            }
          })    
        }else{
          setIsOTPpopupOpen(true);
        }
      }).catch(err=>{
        setLoading(false);
          swal.fire({
               title: "Warning",
               text: err.response.data.message,
               icon: "error"
            }).then((result)=>{
                  if(result.isConfirmed){
                      setState({...state,password:""});
                  }
                 })
      }).finally(() => {
        setLoading(false); // หยุด Loading เมื่อเรียก API เสร็จ
      });
      
    }
    //------------------GOOGLE OAUTH2-------------------//

    const GoogleResponse = (e) =>{
      if(e.data?.token&&!token){
        sessionStorage.setItem('token',e.data?.token);
        window.location.reload();
        setLoading(false);
    }
    } 
    if(isOpen){
     window.addEventListener("message",GoogleResponse);
    }
     
    const googleLoginUrl = async () => {
      try {
        
        const response = await axios.get(`${process.env.REACT_APP_API_USER}/googlelogin`);
        setLoading(true);
        console.log(response);
        const data = response.data.url;
        
        const newWindow = window.open(data, '_blank', 'width=800,height=600');
        
        //watch dog run every 1sec
        const interval = setInterval(() => {
          if (newWindow.closed) {
            setLoading(false);
            clearInterval(interval);  
          }
        }, 1000);

      } catch (error) {
        console.warn (error);
        setLoading(false);
      }
    };

   //------------------OTP-------------------//
   
    const otpSubmit = async (e) =>{
      e.preventDefault();
      if (!otp ) {
        swal.fire({
          title: "Error",
          text: "Please enter OTP .",
          icon: "error",
        });
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("userEmail", userEmail);
      formData.append("password", password);
      formData.append("userImage", userImage);
      formData.append("otp",  otp);
      console.log(formData);
     await axios.post(`${process.env.REACT_APP_API_USER}/otp`, formData)
      .then((response) => {
        sessionStorage.setItem('token', response.data.token);
        swal.fire({
          title: "Complete",
          text: "Welcome to the Application!",
          icon: "success",
        }).then((result)=>{
          if(result.isConfirmed){
            setState({...state,password:"",confirmPassword:"",userName:""});
            setUserImage("");
            onClose();
            window.location.reload();   
        }
        })
         // Redirect after successful login
      }).catch ((error)=> {
        console.error('Error during OTP verification:', error);
        swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        }).then(result=>{
          if(result.isConfirmed){
            setLoading(false);
          }
        })
      }).finally( () => {
        setLoading(false);
      })
     
    }

    const resendOTP = async (e) =>{
        setLoading(true);
        await axios.post(`${process.env.REACT_APP_API_USER}/reotp`,{userEmail})
        .then((response=>{
          swal.fire({
            title: "Complete",
            text: response.data.message,
            icon: "success"    
          })
          setLoading(false);
        }))
    }
   //------------------SignUp----------------------/   
   const signUpHandle =  async (e) =>{
    try{  
        e.preventDefault();
      if(!userName){
        swal.fire({
          title: "Warning",
          text: "Please complete all fields before signing up.",
          icon: "error"
       });  
        return;
      }
        if(password!==confirmPassword) {   
          setLoading(false);
          swal.fire({
               title: "Warning",
               text: "Confirm Password and Confirm password",
               icon: "error"
            });  
            return;
          }
        const checkInput = await validateInputs(userEmail,password);
        if (!checkInput){
          swal.fire({
            title: "Warning",
            text: "Please complete all fields before signing up.",
            icon: "error"
         });  
          return;
        } 
        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("userEmail", userEmail);
        formData.append("password", password);
        formData.append("userImage", userImage);
       console.log(formData);
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_API_USER}/signup`,formData)
            .then(response=>{
                swal.fire({
                  title: "Complete",
                  text: "OTP was sent to your email",
                  icon: "success"    
                }).then((result)=>{
                  if(result.isConfirmed){
                  setIsOTPpopupOpen(true);
                  setIsSignUpPopupOpen(false);
                }
                })
            }).catch(err=>{
                swal.fire({
                    title: "Warning",
                    text: err.response.data.message,
                    icon: "error"
                  }).then((result)=>{
                    if(result.isConfirmed){
                      setState({...state,password:"",confirmPassword:"",userName:""}); 
                      setUserImage("")
                    }
                  })
            }).finally(() => {
              setLoading(false); 
            });
         
      }catch(err){
        console.log("Cannot signup ",err)
      }

   
  }
  if(!isOpen) return null;
  return (
    
            <div className="popup-container">
                <div className="popup-overlay ">
                    <div className={`popup-box ${loading ? "loaderbox ":"" }  `}>  
                          <div className="popup-content" >
                             <div className="popup-header " >
                                                   { !isOTPPopupOpen &&<button type="button" className="close" onClick={()=>{onClose();setState("");setLoading(false);setUserImage("");setIsSignUpPopupOpen(false)}} disabled={loading? true : false} >
                                                            x
                                                    </button>
                                                    }
                             </div> 
                             {!isSignUpPopupOpen ? (
                                      <>
                                        {!isOTPPopupOpen ?(
                                                <>   
                                                  <div className="form-title  ">
                                                    <div> {loading ? (<span>Loading DATA</span>):(<span>Login</span>)}</div>
                                                  </div>
                                                  <form onSubmit={loginHandle} className="popup-form">
                                                    <div className="form-group">
                                                      <label >Email address</label>
                                                      <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Your email..."
                                                        value={userEmail}
                                                        onChange={inputValue("userEmail")}
                                                        disabled={loading ? true : false}
                                                      />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <label >Password</label>
                                                        <input
                                                          type="password"
                                                          className="form-control"
                                                          placeholder="Your password..."
                                                          value={password}
                                                          onChange={(e) => {
                                                            const regex = /^[a-zA-Z0-9]*$/;
                                                            if (regex.test(e.target.value)) {
                                                              inputValue("password")(e);
                                                            }
                                                          }}
                                                          disabled={loading ? true : false}
                                                        />
                                                    </div>
                                                    <button type="submit"  className="btn btn-info btn-block btn-round mt-4 " disabled={loading ? true : false}>                             
                                                      {loading ? (<span>Loading DATA</span>):(<span>Login</span>)}
                                                    </button>
                                                  </form>
                                                  <div className="text-center text-muted popup-footer">                                                                         
                                                    <div className="OR"><span></span> OR </div>                                        
                                                    <button className="btn-google btn mt-3"  
                                                      onClick={() => googleLoginUrl()} 
                                                        disabled={loading ? true : false}
                                                    >
                                                      Sign in with Google
                                                    </button>                                  
                                                      <div className=" d-flex justify-content-center text-signin" >
                                                        <div >Not a member yet? <Link onClick={()=>setIsSignUpPopupOpen(true)} className="text-info btn-link ml-1" disabled={loading ? true : false}> Sign Up</Link>.</div>
                                                      </div>
                                                  </div>
                                                </>  
                                            ):(
                                                <>
                                                  <div className="form-title mt-5">                           
                                                    <div className="mt-3 mb-3"> {loading ? (<span>Submit OTP...</span>):(<span>OTP Verify</span>)}</div>
                                                  </div>
                                                  <form onSubmit={otpSubmit } className="popup-form">
                                                    <div className="form-group mb-3">
                                                      <label className="mb-3">OTP</label>
                                                      <input
                                                        type="text"
                                                        className="form-control "
                                                        placeholder="Your OTP..."
                                                        value={otp}
                                                        onChange={otpInput}
                                                        disabled={loading ? true : false}
                                                      />
                                                    </div>
                                                    <div className="form-group mt-4">
                                                      <button type="submit" className="btn btn-info btn-block btn-round btn-login mb-3" disabled={loading ? true : false}>                             
                                                        {loading ? (<span>Loading DATA...</span>):(<span>submit</span>)}
                                                      </button>
                                                      <button onClick={()=>resendOTP()} className="btn btn-warning btn-block btn-round btn-login mb-3" disabled={loading ? true : false}>                             
                                                        {loading ? (<span>Loading DATA...</span>):(<span>resend OTP</span>)}
                                                      </button>
                                                      <button onClick={()=>{onClose();setState("");setOtp("");setIsOTPpopupOpen(false);}} className="btn btn-warning btn-block btn-round btn-login mb-3" disabled={loading ? true : false}>                             
                                                        {loading ? (<span>Loading DATA...</span>):(<span>Change your email</span>)}
                                                      </button>
                                                    </div>
                                                  </form>                        
                                                </>
                                            )
                                        }    
                                      </> 
                                 ):(
                                      <>
                                         <div className="form-title  ">
                                           <div> {loading ? (<span>Saving DATA</span>):(<span>SignUp</span>)}</div>
                                         </div>
                                         <form onSubmit={signUpHandle} className="popup-form">
                                           <div className="form-group">
                                              <label >Your Name</label>
                                              <input
                                               type="text"
                                               className="form-control"
                                               placeholder="Your name..."
                                               value={userName}
                                               onChange={inputValue("userName")}
                                               disabled={loading ? true : false}
                                               maxLength={10}
                                              />
                                           </div>
                                           <div className="form-group">
                                              <label >Email address</label>
                                              <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Your email..."
                                                value={userEmail}
                                                onChange={inputValue("userEmail")}
                                                disabled={loading ? true : false}
                                              />
                                           </div>
                                           <div className="form-group">
                                              <label >Password</label>
                                              <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Your password..."
                                                value={password}
                                                onChange={(e) => {
                                                  const regex = /^[a-zA-Z0-9]*$/;
                                                  if (regex.test(e.target.value)) {
                                                   inputValue("password")(e);
                                                  }
                                                }}
                                                maxLength={10}
                                                disabled={loading ? true : false}
                                              />
                                           </div>
                                           <div className="form-group">
                                              <label >Confirm Password</label>
                                              <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Confirm Password..."
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                 const regex = /^[a-zA-Z0-9]*$/;
                                                 if (regex.test(e.target.value)) {
                                                   inputValue("confirmPassword")(e);
                                                  }
                                                }}
                                                maxLength={10}
                                                disabled={loading ? true : false}
                                              />
                                           </div>
                                           <div className="form-group">
                                              <label >Your Avatar</label>
                                              <input
                                                type="file"
                                                accept=".png, .jpg, .jpeg"
                                                className="form-control"
                                                placeholder="Your Avatar..."
                                                onChange={userImageValue}
                                                disabled={loading ? true : false}
                                              />
                                           </div>
                                           <button type="submit"  className="btn btn-info btn-block btn-round mt-3" disabled={loading ? true : false}>                             
                                              {loading ? (<span>Saving Data DATA</span>):(<span>Submit</span>)}
                                           </button>
                                         </form>
                                      </>   
                                   )
                              }
                         </div>
                    </div>
                </div>
            </div>
    
  )
}

export default PopUpLogin