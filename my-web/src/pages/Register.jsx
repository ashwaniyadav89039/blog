import React, { useState } from 'react'

import {Link,useNavigate} from 'react-router-dom'




const Register = () => {
  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:"",
  })

  const [err,setError] = useState(null)
   
  const navigate = useNavigate()

  const handleChange = (e) =>{

    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))

  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      
  
      const data = await res.json();
      console.log(data)
      navigate("/login")

     

    } catch (err) {
      // console.log(err);

      setError(err.response.data);
    }
  }
  
  

//  console.log(inputs)
  return (
    <div className='auth'>

      <h1>Register</h1>
       <form>
         <input 
           required 
           type="text"
           placeholder='username'  
           name='username' 
           onChange={handleChange}
          />
         <input 
           required 
           type="email" 
           placeholder='email' 
           name='email' 
           onChange={handleChange} 
          />
         <input
           required 
           type="password"
            placeholder='password' 
            name='password' 
            onChange={handleChange} 
          />
         <button onClick={handleSubmit}>Register</button> 
         {err && <p>{err}</p>}
         <span>Don't you have an account?  <Link to="/login">Login</Link>
         </span>
        </form>
    </div>
  );
};

export default Register;