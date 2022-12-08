import React, { useState } from "react";
import { isAuthenticated } from "../helper/auth";
import { createDifficulty } from "../helper/coreApiCalls";
import Navbar from "./Navbar";

const CreateDifficulties = () => {
  const [type, setType] = useState("");
  const {user,token} = isAuthenticated();


  return (
    <div className="h-screen ">
      <Navbar />
      <h1 className="text-center mt-4 text-xl font-bold text-gray-500">
        Create Difficulty
      </h1>
      <div className="h-[80%] w-screen flex items-center justify-center flex-col  ">
        <div className="border-[1px] p-3 rounded-lg flex flex-col gap-3 ">
          <p className="font-bold">Difficulty : </p>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="text"
            name="difficulties"
            placeholder="enter difficulty type"
          />
          <button class="p-2 border rounded-md mt-4 font-bold bg-green-500 text-white"
           onClick= {(e) => {
            e.preventDefault();
            createDifficulty(user._id,token,{type})
            .then(data=>{
                if(data.error){
                    alert(data.error);
                }else {
                    setType("");
                    alert("Difficulty created successfully");
                }
            })
           } } >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDifficulties;
