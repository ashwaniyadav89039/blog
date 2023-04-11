import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Edit from '../images/edit.jpg';
import Delete from '../images/delete.jpg';
import Menu from '../component/Menu';
import moment from 'moment';
import { AuthContext } from '../context/authContext';



const Single = () => {
    
  const [post, setPost] = useState({});
  const[image,serImage] = useState({})
  console.log(" is ___",image);
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
  
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.innerHTML
  }
  const Bodypart = ({ post }) => {
    let breakdata = [];
    if (post?.descript?.includes("{query}")) { // Add null-check for 'post' and 'descript'
      breakdata =(post.descript).trim().split("{query}");
      const getText = (text) => {
        return text.replace(/<\/?[^>]+(>|$)/g, "");
      };
      const handleCopyButtonClick = (event) => {
        const inputElement = event.target.parentElement.parentElement.querySelector("input");
        inputElement.select();
        document.execCommand();
      };
  
      return (
        <>
          <div className="post" key={post.id}>
            <div className="img">
              {/* <img src={`../upload/${post.image}`} alt="" /> */}
            </div>
            <div className="content">
              <Link className="link" to={`./post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
  
              {
                (breakdata.map((item, index) => {
                  if(index%2 == 0){
                    return(
                        <p dangerouslySetInnerHTML={{ __html: getText(breakdata[index]) }}></p>
                    )
                  }else{
                    return(
                      <div className="copybutton">
                <div className="command">
                  <span>command:</span>
                  <button onClick={handleCopyButtonClick}>copy</button>
                </div>
                <div>
                  <input type="text" placeholder="Text" value={getText(breakdata[index])} />
                </div>
              </div>
                    )
                  }
                }))
              }
  
              {/* <Link className="link" to={`./post/${post.id}`}>
                <button>Read more</button>
              </Link> */}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="post" key={post.id}>
          <div className="img">
            {/* <img src={`../upload/${post.image}`} alt="" /> */}
          </div>
          <div className="content">
            <Link className="link" to={`./post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <p dangerouslySetInnerHTML={{ __html: getText(post.descript) }}></p>
            {/* <Link className="link" to={`./post/${post.id}`}>
              <button>Read more</button>
            </Link> */}
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.image}`} alt="" />
        <div className="user">
          {/* {post?.userImage && <img
            src={post.userImage}
            alt=""
          />} */}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.dates).fromNow()}</p>
          </div>
          {currentUser.username === post?.username && (
            <div className="edit">
              <Link to={`/write?edit=${postId}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
  
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
  
        </div>
        <Bodypart post={post} />
     
      </div>
      <Menu cat = { post.cat}/>
    </div>
  )
}

export default Single
