import React, { useEffect, useState } from 'react';
import {  getAllQuetions } from '../helper/coreApiCalls';
import Quetion from './Quetion';

const AllProblems = () => {
    const [quetions,setQuetions] = useState([]);
    
   

    const loadQuetions = () =>{
        getAllQuetions()
        .then(data=>{
            if(data.error){
                alert("error")
            }else {
                setQuetions(data);
            }
        })
    }
    useEffect(()=>{
        loadQuetions();
        
    },[])
  return (
    <div className='w-full flex items-center justify-center'>
       <div className='w-screen'>
       {
            quetions.map((quetion)=>(
                <Quetion  key ={quetion._id} solved ={false} quetion = {quetion} />
            ))
        }

       </div>
    </div>
  )
}

export default AllProblems