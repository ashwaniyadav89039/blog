
import React from 'react'
import { useState,useContext } from "react";
import {Link,useNavigate} from 'react-router-dom'
import { AuthContext} from '../context/authContext';



const Login = () => {
  const [inputs,setInputs] = useState({
    username:"",
    password:"",
  })

  const [err,setError] = useState(null)
   
  const navigate = useNavigate()

  const {login} = useContext(AuthContext)

  

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(inputs);
      const res = await fetch("/auth/login", {
         method: "POST",
        headers: {
          "Content-Type": "application/json",
         },
         body: JSON.stringify(inputs),
       });
      
        if (res.ok) {
          const data = await res.json();
          console.log(data);
        navigate("/");
        } else if (res.status === 400) {
         throw new Error("Wrong username or password");
        } 
        else {
         throw new Error("Network response was not ok.");
       }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='auth'>

      <h1>Login</h1>
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
           type="password"
           placeholder='password'
           name='password' 
           onChange={handleChange} 
          />
         <button onClick={handleSubmit}>Login</button>
         { err&&<p>{err}</p>}
         <span>Don't you have an account?  <Link to="/register">Register</Link>

         </span>
        
        </form>
    </div>
  );
}

export default Login;