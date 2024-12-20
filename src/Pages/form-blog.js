import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { getUser } from "../Service/FetchUser";
import { useNavigate } from "react-router-dom";



const FormBlog =  () =>{
    console.log("FormBlogPage")
    let token = sessionStorage.getItem('token')
    const [user,setUser] = useState('');
    const [title,setTitle] = useState("");
    const [content,setContent] = useState('')
   const {userName,userEmail} = user
   const navigate = useNavigate();

   useEffect(()=>{
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
   },[token])
    //destrucW
    //create 2 function use for determinetion state value
   console.log(user);
    const titleValue =  e =>{
        setTitle(e.target.value)//เข้าไปแก้ไข state ตาม key=name ที่ส่งมา
    }
    const contentValue=(e)=>{
        setContent(e)
    }

    const submitForm= (e) =>{
        e.preventDefault();//ป้องกันการ render ใหม่แล้ว data หาย 
        axios
        .post(`${process.env.REACT_APP_API_BLOG}/create`,{title,content,userEmail}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) //เรียกใช่ method post และข้อมูลไปยัง server 
        .then(response=>{
            swal.fire({
                title: "Complete",
                text: "Save Data sucecssfully",
                icon: "success"
              }).then(result=>{
                if(result.isConfirmed){
                    setTitle("");
                    setContent({content:""});
                    navigate('/blogs')
                }
            })
              
        }).catch(err=>{ 
            swal.fire({
                title: "Warning",
                text: err.response.data.message,
                icon: "error"
             });
             setTitle("");
             setContent({content:""});
           
        })
        
    }
    return(
        
             
             <main>
                <content className="form-content">
                    <div className="form-control">
                            <h1 className="mt-5">Write Your Blog</h1>
                        
                            <form onSubmit={submitForm}>
                                <div className="form-group mt-5">
                                    <label className="mb-2">Title</label>
                                    <input type="text" className="form-control"
                                        value={title} 
                                        onChange={titleValue  }
                                    />
                                </div>
                            
                                <div className="form-group">
                                    <label className="mb-2">Content</label>
                                <ReactQuill
                                value={content}
                                onChange={contentValue}
                                theme="snow"
                                className=" pb-5 "
                                placeholder="Write your blog here"
                                style={{border:'1px solid #556',
                                    height:'300px'
                                }}
                                />
                                </div>
                                
                                <div className="form-group">
                                    <label className="mb-2">Author</label>
                                    <textarea className="form-control" 
                                        value={userName}
                                        disabled={token? true:false}
                                    />
                                </div>
                            
                                <input type="submit" value="Save" className="btn btn-primary"/>
                            </form>
                        </div>
                </content>
             </main>
        
    )
    
}

export default  FormBlog ;