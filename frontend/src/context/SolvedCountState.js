import { useEffect, useState } from "react";
import { isAuthenticated } from "../helper/auth";
import { getAllQuetions, getSolvedQuetions } from "../helper/coreApiCalls";
import { SolvedCountContext } from "./SolvedCountContext";

export const SolvedCountState = (props) =>{
  const [solved,setSolved] = useState(0);
  const [all,setAll] = useState(0);
  const {user , token} = isAuthenticated();
  
  const getAll = () =>{
    getAllQuetions()
    .then((data=>{
      if(data.error){
        alert(data.error);
      }else{
        setAll(data.length);
      }
    }))
  };

  const getSolved = () =>{
    getSolvedQuetions(user._id,token)
    .then((data=>{
      if(data.error){
        alert(data.error);
      }else{
        setSolved(data.length);
      }
    }))
  };

  useEffect(()=>{
    if(isAuthenticated()){
      getAll();
      getSolved();
    }
   
  },[]);

    return (
        <SolvedCountContext.Provider value={{solved,setSolved,all,setAll}}>
            {props.children}
        </SolvedCountContext.Provider>
    )
}