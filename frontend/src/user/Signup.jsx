import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Base from '../core/Base';
import { signUp } from '../helper/auth';


const Signup = () => {
  const [values,setValues] = useState({
    name : "",
    email : "",
    password : "",
    error : "",
    success : false
  });

  const {name,email,password,error,success} = values;

  const handleChange = name => event =>{
    setValues({...values,[name]:event.target.value});
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    signUp({name,email,password})
    .then(data =>{
      if(data.error){
        setValues({...values,error:data.error});
        alert(data.error);
      }else{
        setValues({
          ...values,
          name : "",
          email : "",
          password : "",
          error : "",
          success : true
        });
        alert('Signed Up Successfully');
      }
    })
  }

  let signup = (
    <>
      <div className='bg-white h-[88vh]  flex items-center justify-center'>
        <form>
          <div className='p-3 border-[1px] flex flex-col gap-3 rounded-md'>
            <div className='flex gap-3 '>
              <label className='font-bold border-none active:border-none' htmlFor="name">Name</label>
              <input onChange={handleChange("name")} value={name} type="text" placeholder='enter your name' />
            </div>
            <div className='flex gap-3 '>
              <label className='font-bold' htmlFor="name">email</label>
              <input onChange={handleChange("email")} value={email} type="email" placeholder='enter your email' />
            </div>
            <div className='flex gap-3 '>
              <label className='font-bold' htmlFor="name">Password</label>
              <input onChange={handleChange("password")} value={password} type="password" placeholder='enter your password' />
            </div>
            <button onClick={onSubmit} className='bg-green-400 p-1 rounded-b-md text-white font-bold mt-3' type='submit'>Signup</button>
          </div>
        </form>
      </div>

    </>
  )

  return (
    <>
      <Base child={signup} />
    </>
  )
}

export default Signup;