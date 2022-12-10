import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../helper/auth";

import {
  addCompletedQuetion,
  deleteCompletedQuetion,
} from "../helper/coreApiCalls";

const Quetion = ({ quetion, solved, reload, setReload }) => {
  const { user, token } = isAuthenticated();
  const [redirect, setRedirect] = useState(false);

  const setDifficulty = (difficultyId) => {
    if (difficultyId === "6356152e9184e98272f9906e") {
      return "Easy";
    } else if (difficultyId === "635615679184e98272f99071") {
      return "Medium";
    } else {
      return "Hard";
    }
  };

  const setDcss = (difficulty) => {
    if (difficulty === "Easy") {
      return "text-green-500 font-bold w-[100px] h-[50px] text-center p-3 rounded-full border-[1px]";
    } else if (difficulty === "Medium") {
      return "text-yellow-500 font-bold w-[100px] text-center h-[50px] p-3 rounded-full border-[1px]";
    } else {
      return "text-red-500 font-bold w-[100px] text-center h-[50px] p-3 rounded-full border-[1px]";
    }
  };

  const performRedirect = () => {
    if (redirect) {
      return <Navigate to="/user/solved" />;
    }
  };

  return (
    <>
      {performRedirect()}
      <div className=" flex items-center justify-center">
        <p className="pt-5 hover:shadow-md transition-all duration-300 ease-out  w-[80%] flex justify-between gap-3 border-[1px] m-5 items-center p-3 rounded-lg">
          <div className="flex gap-5 items-center w-[45vw] justify-between">
            {isAuthenticated() && user.role === 0 && !solved && (
              <svg
                onClick={() => {
                  addCompletedQuetion(user._id, quetion._id, token).then(
                    (data) => {
                      if (data.error) {
                       alert(data.error)
                      } else {
                        setRedirect(true);
                        alert("Problem marked as Completed");
                      }
                    }
                  );
                }}
                class="w-8 h-8 cursor-pointer text-violet-300 hover:text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            )}
            <a
              href={quetion.url}
              target="blank"
              className="font-bold text-xl hover:underline text-gray-500"
            >
              {quetion.title}
            </a>
            <p className={`${setDcss(setDifficulty(quetion.difficulty))}`}>
              <p>{setDifficulty(quetion.difficulty)}</p>
            </p>
          </div>

          {isAuthenticated() && solved && (
            <>
              <svg
                onClick={() => {
                    deleteCompletedQuetion(user._id, quetion._id, token).then(
                      (data) => {
                        if (data.error) {
                          alert(data.error);
                        } else {
                          alert("Problem deleted successfully");
                          setReload(!reload);
                        }
                      }
                    );
                  }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 cursor-pointer text-blue-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default Quetion;
