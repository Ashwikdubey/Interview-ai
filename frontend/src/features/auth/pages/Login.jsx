import React, { useState } from 'react'
import "../auth.forms.scss"
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const Navigate=useNavigate();
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const {handleLogin,loading}= useAuth();

  const onsubmitHandler=async(e)=>{
    e.preventDefault();
    await handleLogin({email,password})
    Navigate("/")
  }

  // if(loading){
  //   return(<main><h1>Loading....</h1></main>)
  // }

  return (
    <main>
      <div className="form-container">

        <h1>Login</h1>

        <form onSubmit={onsubmitHandler}>

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
            <button type='submit' className='button primary-button'>Login</button>

        </form>

         <p>New User? <Link to={"/register"}>Register here</Link></p>
      </div>
    </main>
  )
}

export default Login