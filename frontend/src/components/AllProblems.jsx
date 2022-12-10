import React, { useEffect, useState } from "react";
import { getAllQuetions } from "../helper/coreApiCalls";
import Quetion from "./Quetion";

const AllProblems = () => {
  const [quetions, setQuetions] = useState([]);
  const [filtered,setFiltered] = useState([]);
  const [query,setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const loadQuetions = () => {
    setLoading(true);
    getAllQuetions().then((data) => {
      if (data.error) {
        alert("error");
        setLoading(false);
      } else {
        setQuetions(data);
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    loadQuetions();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <img
            src="https://www.icegif.com/wp-content/uploads/loading-icegif-1.gif"
            alt=""
          />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center flex-col">
          <div className="flex items-center gap-10 mt-5">
            <div className="flex gap-2  border p-3 rounded-full">
              <svg
                class="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
              <select className="pr-2 text-center text-gray-500 focus: outline-none" name="" id="">
                <option value="">Difficulty</option>
                <option value="">Easy</option>
                <option value="">Medium</option>
                <option value="">Hard</option>
              </select>
            </div>

            <div>
              <div className="border rounded-lg p-3">
                <div className="flex gap-3 ">
                  <div className="flex gap-3">
                    <svg
                      class="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <input className = 'focus : outline-none text-gray-500' type="search" placeholder="Search" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen mt-5">
            {quetions.map((quetion) => (
              <Quetion key={quetion._id} solved={false} quetion={quetion} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllProblems;
