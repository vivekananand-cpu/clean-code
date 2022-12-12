import React, { useState } from 'react'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Base from '../core/Base';
import { authenticate, isAuthenticated, login } from '../helper/auth';


const SignIn = () => {
  const [values,setValues] = useState({
    email : "",
    password : "",
    loading : false,
    didRedirect : false
  });

  const {email,password,didRedirect} = values;
  const {user} = isAuthenticated();

  const handleChange = name => event =>{
    setValues({...values,[name]:event.target.value});
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    setValues({...values,loading : true})
    login({email,password})
    .then(data =>{
      if(data.error){
        setValues({...values,error:data.error});
        alert(data.error);
      }else{
       authenticate(data,()=>{
        setValues({
          ...values,
          email : "",
          password : "",
          didRedirect : true
        })
       })
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  const performRedirect = () =>{
    if(didRedirect){
      if(user && user.role === 1){
        return <Navigate to='/admin/dashboard' />
      }else{
        return <Navigate to='/user/solved' />
      }
    }
    if(isAuthenticated()){
      return <Navigate to='/' />
    }
  }
  
  let signin = (
    <>{ performRedirect()}
      <div className='bg-white h-[88vh]  flex items-center justify-center'>
        <form>
          <div className='p-3 border-[1px] flex flex-col gap-3 rounded-md'>
            <div className='flex gap-3 '>
              <label className='font-bold' htmlFor="name">email</label>
              <input onChange={handleChange("email")} value={email} type="email" placeholder='enter your email' />
            </div>
            <div className='flex gap-3 '>
              <label className='font-bold' htmlFor="name">Password</label>
              <input onChange={handleChange("password")} value={password} type="password" placeholder='enter your password' />
            </div>
            <button onClick={onSubmit} className='bg-green-400 p-1 rounded-b-md text-white font-bold mt-3' type='submit'>Sign In</button>
          </div>
        </form>
      </div>
     {JSON.stringify(values)}
    </>
  )

  return (
    <>
      <Base child={signin} />
    </>
  )
}

export default SignIn;