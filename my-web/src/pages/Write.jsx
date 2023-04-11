import React, { useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
  const {state} = useLocation();
  console.log("state is :==",state);

  
  const [value, setValue] = useState(state?.title || '');
  const [title, setTitle] = useState(state?.descript || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setMessage] = useState('');
  

  const navigate = useNavigate();
  console.log("valueid ",value);
  console.log("title id ",title);
  console.log("file id ",file);
  console.log("cat id ",cat);

  const upload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("~~~", data);
      return data;
      
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleClick = async (e) => {
    e.preventDefault();


   if (!value) {
    setErrorMessage('Please fill the title field');
    return;
   }
    else if (!title) {
    setMessage('Please fill the description field');
    return;
   }
    const imgUrl = await upload();
  
    const requestOptions = {
      method: state ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        desc:value,
        cat,
        img: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      })
    };

    console.log(" request option >>>",requestOptions);
  
    try {
      const res = await fetch(state ? `/posts/${state.id}` : '/posts/', requestOptions);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  
  console.log("");
  
 
  
  return (
    <div className='add'>
      <div className="content">
         
        <input
        value={value}
         type="text" 
         placeholder='Title'
         onChange={e=>setValue(e.target.value)}
         required
         
        />
         {errorMessage && <p className="error" style={{ color: 'red'}}>{errorMessage}</p>}

         
        <div className="editcontainer">
          <ReactQuill
           className='editor' 
           theme="snow"
           value={title} 
           onChange={setTitle} 
           required
          />  
             
        </div>
        {error && <p className="error" style={{ color: 'red'}}>{error}</p>}
      </div>
      <div className="menu">
        <div className="item">
           
          <h2>Publish</h2>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input 
           style={{display:'none'}} 
           type="file" 
           id='file' 
           name='' 
           onChange={(e)=>setFile(e.target.files[0])} 
          />
          <label className='file' htmlFor="file">
            Upload Image
          </label>
           <div className="buttons">
            
             <button>Save as draft</button>
             <button onClick={handleClick}>Publish</button>
           </div> 
        </div>
        <div className="item">
          <h2>Category</h2>
          
          <div className='cat'>
            <input 
            type="radio" checked={cat === "art"} 
            name='cat' 
            value='art' 
            id='art' 
            onChange={e=>setCat(e.target.value)}
          />
          <label htmlFor="art">Art</label>
        </div>
        <div className="cat">
          <input type="radio" 
          checked={cat === 'linux'} 
          name='cat' value='linux' 
          id='linux' 
          onChange={e=>setCat(e.target.value)}
        />
        <label htmlFor="linux">Linux</label>
      </div>
        <div className="cat"> 
          <input 
           type="radio"  
           checked={cat === 'ubantu'} 
           name='cat' value='ubantu' 
           id='ubantu' 
           onChange={e=>setCat(e.target.value)}
          />
          <label htmlFor="ubantu">Ubantu</label>
        </div>
          <div className="cat">         
            <input 
             type="radio"
             checked={cat === 'window'} 
             name='cat' value='window' 
             id='window' 
             onChange={e=>setCat(e.target.value)}
            />
           <label htmlFor="window">Window</label>
          </div>
          <div className="cat">
            <input 
             type="radio"
             checked={cat === 'ios'} 
             name='cat' value='ios' 
             id='ios' 
             onChange={e=>setCat(e.target.value)}
            />
          <label htmlFor="ios">Ios</label>
          </div>
          <div className="cat">
            <input 
             type="radio"
             checked={cat === 'technology'} 
             name='cat' 
             value='technology' 
             id='technology' 
             onChange={e=>setCat(e.target.value)}
            />
           <label htmlFor="technology">Technology</label>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Write