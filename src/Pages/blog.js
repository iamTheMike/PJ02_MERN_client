import {Link, useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import parseHTML from 'html-react-parser';
import swal from 'sweetalert2'
import { Loading } from '../components'

const Blog = () => {
  console.log("BlogPage")
  const [isLoading,setisLoading] = useState(false)
  const token = sessionStorage.getItem('token')
  const {slug}= useParams();
  const [blog,setBlog] = useState('');
  const navigate = useNavigate();
  
  
 const fetchData = async()=>{
  setisLoading(true);
  axios.get(`${process.env.REACT_APP_API_BLOG}/${slug}`)
    .then(response=>{
       setBlog(response.data)
     }).catch(error=>{
      navigate("/blogs");
      swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
      })
     })
 }
 const fetching =async()=>{
  await fetchData();    
  setisLoading(false);
 }  
useEffect(()=>{
fetching();
 // eslint-disable-next-line react-hooks/exhaustive-deps
},[token,slug]) 

  
  return (
      <main>
            <content>
            {isLoading&& <Loading ></Loading>}
            {blog ?
                 <div className="blog-control">
                    <div className="blog-box">
                      <div className="title-box">
                         <h1 className="title-blog"> {blog.title}</h1>
                      </div>
                      <div className="content-box">
                         <div className="content-blog">{parseHTML(blog.content)}</div>
                      </div>
                      <div className="author-box">
                      <p  className="text-muted">Author: <Link to={`/profile/${blog.userName}`}> {blog.userName} </Link></p>
                      <p className="text-muted">Date: {new Date(blog.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                </div>:null}
            </content>  
      </main>      
    
  
  )
}

export default Blog;