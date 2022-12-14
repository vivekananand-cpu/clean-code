import React, { useContext, useEffect, useState } from 'react'
import { SolvedCountContext } from '../context/SolvedCountContext';
import { isAuthenticated } from '../helper/auth';
import { getSolvedQuetions } from '../helper/coreApiCalls';
import Quetion from './Quetion';

const SolvedProblems = () => {
  const {setSolved} = useContext(SolvedCountContext);
    const [problems,setProblems] = useState([]);
    const {user,token} = isAuthenticated();
    const [reload,setReload] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        getSolvedQuetions(user._id,token)
        .then(data=>{
            if(data.error){
                alert("Error");
                setLoading(false);

            }else{
                setProblems(data);
                setLoading(false);
            }
        })
       
    },[reload, token, user._id]);

  useEffect(()=>{
    setSolved(problems.length);
  },[problems])

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
            problems.map((quetion)=>(
                <Quetion  key ={quetion._id} solved ={true} quetion = {quetion} reload = {reload} setReload = {setReload} />
            ))
        }

       </div>
    </div>
        )
      }
    
    </>
  )
}

export default SolvedProblems;