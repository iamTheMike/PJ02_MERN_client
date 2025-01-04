import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import parseHTML from "html-react-parser"
import Swal from "sweetalert2";
import { getUser } from "../Service/FetchUser";
import { Loading } from '../components'

const Blogs = () => {
  const [isLoading, setisLoading] = useState(false)
  const token = sessionStorage.getItem('token')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const fetchData = async () => {
    setisLoading(true);
    await axios.get(`${process.env.REACT_APP_API_BLOG}/all`)
      .then(response => {
        setBlogs(response.data)
      }).catch(eror => {
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
  const fetching = async () => {
    await fetchUser();
    await fetchData();
    setisLoading(false);
  }
  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API_BLOG}/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        Swal.fire({
          title: "Deleted!",
          text: "Your Blog has been deleted.",
          icon: "success"
        });
        window.location.reload();
      }).catch(err => {
        Swal.fire({
          title: "Warning",
          text: err.response.data.message,
          icon: "error"
        });
      })
  }
  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  }
  return (
    <main>
      <content >
        <div className="blogs-control">
          <h4>Blogs</h4>
          {isLoading && <Loading ></Loading>}
          {blogs ?
            <div className="blogs-box" >
              {blogs.map((blog, index) => (
                <div className="row mb-3 blogs" key={index} >
                  <div className="col mb-5" >
                    <Link to={`/blog/${blog.slug}`}>
                      <h2 className="blogs-title">{blog.title}</h2>
                    </Link>
                    <div className="pt-3 mb-3">{parseHTML(blog.content.substring(0, 180))}</div>
                    <div className="author.box">
                      <p className="text-muted">Author: <Link to={`/profile/${blog.userName}`}> {blog.userName} </Link></p>
                      <p className="text-muted">Date: {new Date(blog.createdAt).toLocaleString()}</p>
                    </div>
                    {(user?.role === 'admin' || user?.userName === blog.userName) &&
                      <>
                        <Link to={`/edit-blog/${blog.slug}`} className="btn btn-outline-success mr-3">edit</Link>
                        <Link className="btn btn-outline-danger" onClick={() => confirmDelete(blog.slug)}>Delete</Link>
                      </>
                    }
                  </div>
                </div>

              ))
              }
            </div>
            : null}
        </div>
      </content>
    </main>

  )
}

export default Blogs