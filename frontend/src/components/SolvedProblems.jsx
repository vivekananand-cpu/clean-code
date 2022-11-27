import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../helper/auth';
import { getSolvedQuetions } from '../helper/coreApiCalls';
import Quetion from './Quetion';

const SolvedProblems = () => {
    const [problems,setProblems] = useState([]);
    const {user,token} = isAuthenticated();
    
    useEffect(()=>{
        getSolvedQuetions(user._id,token)
        .then(data=>{
            if(data.error){
                alert("error")
            }else{
                setProblems(data)
            }
        })
    },[]);

  return (
    <div className='w-full flex items-center justify-center'>
       <div className='w-screen'>
       {
            problems.map((quetion)=>(
                <Quetion  key ={quetion._id} solved ={true} quetion = {quetion} />
            ))
        }

       </div>
    </div>
  )
}

export default SolvedProblems