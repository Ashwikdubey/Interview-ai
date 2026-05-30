import React, { useState } from 'react'
import "../auth.forms.scss"
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Register = () =>{

  const Navigate=useNavigate();
  const[username,setusername] =useState("")
  const[email,setemail] =useState("")
  const[password,setpassword] =useState("")

  const {handleRegister,loading}=useAuth();

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    await handleRegister({username,email,password})
    Navigate("/");
  }
  if(loading) return(<h1>Loading</h1>)

  return (
     <main>
      <div className="form-container">
          
        <h1>Register</h1>

        <form onSubmit={onSubmitHandler}>

            <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id='username' name='username' placeholder='Enter your username' 
            onChange={(e)=>{setusername(e.target.value)}}/>
           </div>
           <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' placeholder='Enter your email' 
            onChange={(e)=>{setemail(e.target.value)}}/>
           </div>
           <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name='password' placeholder='Enter your password' 
            onChange={(e)=>{setpassword(e.target.value)}}/>
           </div>
            <button type='submit' className='button primary-button'>Register</button>

        </form>

        <p>Already have an account? <Link to={"/login"}>Login</Link></p>

      </div>
    </main>
  )
}

export default Register