import React, { useState } from "react";
import { useEffect } from "react";
import { isAuthenticated } from "../helper/auth";
import { addProblem, fetchDifficulties } from "../helper/coreApiCalls";
import Navbar from "./Navbar";

const AddProblem = () => {
    const [title,setTitle] = useState('');
    const [difficulty,setDifficulty] = useState('');
    const [url,setUrl] = useState('');
    const [difficulties,setDifficulties] = useState([]);
  

    const {user,token} = isAuthenticated();

    const getDifficulties = () =>{
        fetchDifficulties(user._id,token)
        .then(data=>{
            if(data.error){
                alert(data.error)
            }else{
                setDifficulties(data);
            }
        })
    };

   

    useEffect(()=>{
        getDifficulties();
    },[])
  return (
    <>
    <div className="h-screen">
      <Navbar />
      <h1 className="font-bold text-xl text-gray-500 text-center mt-5">Add a Problem</h1>
      <div className="w-screen h-[80%] flex items-center justify-center">
        <div className="flex flex-col gap-3 border w-[30%]  p-3 rounded-lg">
          <div className="flex flex-col w-full gap-3">
            <label className='font-bold' htmlFor="title">Title :</label>
            <input
              onChange={(e)=>setTitle(e.target.value)}
              value = {title}
              type="text"
              name="title"
              placeholder="Enter title of Problem"
              className='focus : outline-none'
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className='font-bold' htmlFor="difficulties">Select Difficulty Type :</label>
          <select onChange={(e)=>setDifficulty(e.target.value)} name="difficulties" id="">
                    <option value="">Select</option>
                    {
                        difficulties.map((difficulty)=>(
                            <option value={difficulty._id}>{difficulty.type}</option>
                        ))
                    }
                </select>
          </div>
           
          <div className="flex flex-col gap-3">
            <label className='font-bold' htmlFor="url">URL :</label>
            <input
              onChange={(e)=>setUrl(e.target.value)}
              value = {url}
              type="text"
              name="url"
              placeholder="Enter URL of a Problem"
              className='focus : outline-none'
            />
          </div>
          <button onClick={(e)=>{
            e.preventDefault();
            addProblem(user._id,token,{title,difficulty,url})
            .then(data=>{
                if(data.error){
                    alert(data.error)
                }else{
                    setDifficulty("");
                    setTitle("");
                    setUrl("");
                    alert("Problem added successfully !")
                   
                    
                }
            })
          }} className="bg-green-500 p-2 rounded-md text-white mt-5">Add</button>
        </div>
       
      </div>
     
    </div>
    </>
  );
};

export default AddProblem;
