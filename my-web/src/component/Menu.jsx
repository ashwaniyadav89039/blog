import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Menu = ({cat}) => {
  const [posts,setPosts] = useState([]);



  console.log(posts,"jjjjjjjjjjjj");

 

  useEffect(()=>{
    const fetchData = async () =>{
      try {

        const  res =  await fetch(`/posts/?cat=${cat}`);
        const data = await res.json(); // resolve the promise and extract the response data
        
        setPosts(data);
        
      } catch (error) {
        console.log(error); // log the error to console
      }
    }
    fetchData();
  },[cat]);

 
  return (
    <div className='menu'>
        <h2>Other post you may like</h2>
        {posts.map((post) =>(
          <div className="post" key={post.id}>
            <img src={`../upload/${post.image}`}alt="" />
            
           
             <Link className='link' to={`/post/${post.id}`}>
               <h2>{post.title}</h2>
             </Link>
              <Link className='link' to={`/post/${post.id}`}>
               <button>Read more</button>
              </Link>

            
          </div>
        ))}
    </div>
  )
}

export default Menu