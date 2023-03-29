import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
const Home = () => {


  const [posts,setPosts] = useState([]);

  const cat= useLocation().search
  console.log("¬¬¬`",cat);

 

  useEffect(()=>{
    const fetchData = async () =>{
      try {

        const  res =  await fetch(`/posts${cat}`);
        const data = await res.json(); // resolve the promise and extract the response data
        
        setPosts(data);
        
      } catch (error) {
        console.log(error); // log the error to console
      }
    }
    fetchData();
  },[cat]);
 
  


  // const posts = [
  //   {
  //     id : 1,
  //     title : "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  //     desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quos quisquam, aliquid delectus, nesciunt laboriosam saepe atque aperiam neque dolorum sit, reiciendis a sunt similique accusamus corporis facere vitae. Tenetur.",
  //     img:"https://picsum.photos/200/300"
  //   },
  //   {
  //     id : 2,
  //     title : "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  //     desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quos quisquam, aliquid delectus, nesciunt laboriosam saepe atque aperiam neque dolorum sit, reiciendis a sunt similique accusamus corporis facere vitae. Tenetur.",
  //     img:"https://picsum.photos/200/300"
  //   },
  //   {
  //     id : 3,
  //     title : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quos quisquam, aliquid delectus, nesciunt laboriosam saepe atque aperiam neque dolorum sit, reiciendis a sunt similique accusamus corporis facere vitae. Tenetur.",
  //     img:"https://picsum.photos/200/300"
  //   },
  //   {
  //     id : 4,
  //     title : "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  //     desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quos quisquam, aliquid delectus, nesciunt laboriosam saepe atque aperiam neque dolorum sit, reiciendis a sunt similique accusamus corporis facere vitae. Tenetur.",
  //     img:"https://picsum.photos/200/300"
  //   },
   
  // ]
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  
  return (
    <div className='home'>
      <div className="posts">
        
        {posts.map((post) =>(
          <div className="post" key={post.id}>
            <div className="img"  >
              <img src={`../upload/${post.image}`} alt="" />
            </div>
            <div className="content">
              <Link className='link' to={`./post/${post.id}`}>
              
                <h1>{post.title}</h1>
               </Link>
               <p>{getText(post.descript)}</p>
               <Link className='link' to={`./post/${post.id}`}>
               <button>Read more</button>
               </Link>
            </div>
          </div>
        ))}
      </div>
       
    </div>
  )
}

export default Home