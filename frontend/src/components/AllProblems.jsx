import React, { useEffect, useState } from 'react';
import {  getAllQuetions } from '../helper/coreApiCalls';
import Quetion from './Quetion';

const AllProblems = () => {
    const [quetions,setQuetions] = useState([]);
    const [loading,setLoading] = useState(false);
    
    const loadQuetions = () =>{
        setLoading(true);
        getAllQuetions()
        .then(data=>{
            if(data.error){
                alert("error");
                setLoading(false);
            }else {
                setQuetions(data);
                setLoading(false);
            }
        })
    }
    useEffect(()=>{
        loadQuetions();
        
    },[])
  return (
    <>
     {
        loading ? (
            <div className="flex items-center justify-center">
            <img src="https://www.icegif.com/wp-content/uploads/loading-icegif-1.gif" alt="" />
        </div>
        ) : (

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
    </>
  )
}

export default AllProblems