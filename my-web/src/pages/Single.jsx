import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Edit from '../images/edit.jpg';
import Delete from '../images/delete.jpg';
import Menu from '../component/Menu';
import moment from 'moment';
import { AuthContext } from '../context/authContext';



const Single = () => {
    
  const [post, setPost] = useState({});
  console.log("post is ___",post);
  const location = useLocation();
  const navigate= useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  console.log("+++",postId);
  

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/posts/${postId}`);
        const data = await res.json();
        setPost(data);
        console.log("+++",data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/posts/${postId}`, {
        method: 'DELETE'
      });

        navigate("/") 
      } catch (error) {
      console.log(error);
    }
  }
  
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.image}`} alt="" />
        <div className="user">
          {post.userImage && <img
            src={post.userImage}
            alt=""
          />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.dates).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
               <Link to={`/write?edit=${postId}`} state={post}>
                <img src={Edit} alt="" />
              </Link>

              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.descript)}</p>
      </div>
      <Menu cat = { post.cat}/>
    </div>
  )
}

export default Single
