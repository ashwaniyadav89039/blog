import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cat = useLocation().search;
  
  const POSTS_PER_PAGE = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/posts${cat}`);
        const data = await res.json();
        data.reverse();
        setAllPosts(data);
        setPosts(data.slice(0, POSTS_PER_PAGE));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerHTML;
  };
  
  const handleNextButtonClick = () => {
    setCurrentPage(currentPage + 1);
    const startIndex = (currentPage + 1 - 1) * POSTS_PER_PAGE;
    const endIndex = (currentPage + 1 - 1) * POSTS_PER_PAGE + POSTS_PER_PAGE;
    setPosts(allPosts.slice(startIndex, endIndex));
  };
  const handlePreviousButtonClick = () => {
    setCurrentPage(currentPage - 1);
    const startIndex = (currentPage - 1 - 1) * POSTS_PER_PAGE;
    const endIndex = (currentPage - 1 - 1) * POSTS_PER_PAGE + POSTS_PER_PAGE;
    setPosts(allPosts.slice(startIndex, endIndex));
  };
  
  
  
  const Bodypart = ({ post }) => {
   let breakdata = [];
    if (post.descript.includes("{query}")) {
      breakdata = (post.descript).trim().split("{query}");
      const getText = (text) => {
        return text.replace(/<\/?[^>]+(>|$)/g, ""); 
      };
      const handleCopyButtonClick = (event) => {
        const inputElement = event.target.parentElement.parentElement.querySelector("input");
        inputElement.select(); 
        document.execCommand();
      };

      return (
        < >
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.image}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`./post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              {/* {
                (breakdata.map((item, index) => {
                  if(index%2 == 0){
                    return(
                        <p dangerouslySetInnerHTML={{ __html: getText(breakdata[index]).slice(0,100) +"..." }}></p>
                    )
                  }else{
                    return(
              //         <div className="copybutton">
              //        <div className="command">
              //         <span>command:</span>
              //       <button onClick={handleCopyButtonClick}>copy</button>
              //      </div>
              //      <div>
              //       <input type="text" placeholder="Text" value={getText(breakdata[index])} />
              //   </div>
              // </div>
                       <p>cmd</p>
                    )
                  }
                })) 
              } */}
              <p dangerouslySetInnerHTML={{ __html: getText(breakdata[0]).slice(0,100) +"....." }}></p>
              <Link className="link" to={`./post/${post.id}`}>
                <button>Read more</button>
              </Link>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`../upload/${post.image}`} alt="" />
          </div>
          <div className="content">
            <Link className="link" to={`./post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <p dangerouslySetInnerHTML={{ __html: getText(post.descript).slice(0, 100) + "....." }}></p>
            <Link className="link" to={`./post/${post.id}`}>
              <button>Read more</button>
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="home">
      <div className="posts"  style={{ paddingBottom: "20px" }}>
        {posts.map((post) => (
          <Bodypart post={post} />
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handlePreviousButtonClick}>Previous</button>
        )}
        {currentPage * POSTS_PER_PAGE < allPosts.length && (
          <button onClick={handleNextButtonClick}>Next</button>
        )}
      </div>
    </div>
  );
  
};

export default Home;
