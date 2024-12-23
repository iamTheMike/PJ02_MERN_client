import axios from "axios"
import {  useEffect,useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { getUser } from "../Service/FetchUser";
import { Loading } from "../components";

const EditBlog= () => {
    const [isLoading,setisLoading] = useState(false)
   const token = sessionStorage.getItem('token')
   const [user,setUser] = useState('');
    const {slug} = useParams();
    const navigate = useNavigate();
    const [state,setState] = useState({
        title:"",
        author:""
    });
    const {title,author} = state;
    const [content,setContent] = useState('');
    const fetchData = async() =>{
        setisLoading(true);
        await axios.get(`${process.env.REACT_APP_API_BLOG}/${slug}`)    
        .then(response=>{
           setState({
                title: response.data.title,
                author: response.data.userName,
            });
            setContent(response.data.content);
          
         }).catch(error=>{
            navigate("/blogs");
            swal.fire({
              title: "Error",
              text: error.response.data.message,
              icon: "error",
            })
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
    //pull data target blog
    useEffect(()=>{
        fetching();
         // eslint-disable-next-line react-hooks/exhaustive-deps
       },[token,slug]) 
    

    
    if(author&&user){
        if(author!==user.userName){
            if(user.role!=='admin'){
             swal.fire({
                    title: "Warning",
                    text: "Only Author's this blog can access",
                    icon: "error"
                  }).then((result)=>{
                    if(result.isConfirmed){
                     navigate('/blogs')
                    }
                  })
            }
        }
    }
    

    const inputValue =(name)=>(e)=>{
        setState({...state,[name]:e.target.value});
    }
    const contentValue=(e)=>{
        setContent(e)
    }
    const submitForm =  (e)=>{
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_BLOG}/${slug}`,{title,content,author}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=>{
            swal.fire({
                title: "Complete",
                text: "Edit Data sucecssfully",
                icon: "success"
              });
              navigate(`/blogs`)
        }).catch(err=>{ 
            swal.fire({
             title: "Warning",
             text: err.response.data.message,
             icon: "error"
          });
        })  
    }
  return (
    
        
        <main>  
           <content>
           {isLoading&& <Loading ></Loading>}
            <h1 className="mt-5">Write Your Blog</h1>
           
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label className="mb-2">Title</label>
                    <input type="text" className="form-control"
                        value={title} 
                        onChange={inputValue("title")}
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
                        value={author}
                       disabled={true}
                    />
                </div>
               
                <input type="submit" value="Save" className="btn btn-primary"/>
            </form>
           </content>  
        </main>  
    
  )
}

export default EditBlog