import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../helper/auth';
import { getSolvedQuetions } from '../helper/coreApiCalls';
import Quetion from './Quetion';

const SolvedProblems = () => {
    const [problems,setProblems] = useState([]);
    const {user,token} = isAuthenticated();
    const [reload,setReload] = useState(false);
    
    useEffect(()=>{
        getSolvedQuetions(user._id,token)
        .then(data=>{
            if(data.error){
                alert("Error");
            }else{
                setProblems(data)
            }
        })
    },[reload]);

  return (
    <div className='w-full flex items-center justify-center'>
       <div className='w-screen'>
       {
            problems.map((quetion)=>(
                <Quetion  key ={quetion._id} solved ={true} quetion = {quetion} reload = {reload} setReload = {setReload} />
            ))
        }

       </div>
    </div>
  )
}

export default SolvedProblems;