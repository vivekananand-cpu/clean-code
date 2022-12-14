import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllQuetions } from "../helper/coreApiCalls";
import Quetion from "./Quetion";

let active = false;
let activeCss = "border rounded-full w-[100px] p-2 text-center text-white bg-violet-500 font-bold flex items-center justify-center";
let offCss = "border hover:border-violet-400 rounded-full w-[100px] p-2 text-center text-gray-600 font-bold flex items-center justify-center";
const currentTab = (path) => {
  if (window.location.pathname === path) {
    active = true;
  } else {
    active = false;
  }
};

const AllProblems = () => {
  const [quetions, setQuetions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const filterdItems = useMemo(() => {
    return quetions.filter((quetion) => {
      return quetion.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, quetions]);

  const easyQuetions = useMemo(() => {
    return  filterdItems.filter((quetion)=>{
      return quetion.difficulty.type === "Easy"
    })
  },[filterdItems]);

  const mediumQuetions = useMemo(() => {
    return  filterdItems.filter((quetion)=>{
      return quetion.difficulty.type === "Medium"
    })
  },[filterdItems]);

  const hardQuetions = useMemo(() => {
    return  filterdItems.filter((quetion)=>{
      return quetion.difficulty.type === "Hard"
    })
  },[filterdItems]);


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
            <Link
              onClick={currentTab("/")}
              to="/"
              className={`${
                active
                  ? activeCss
                  : offCss
              }`}
            >
              <div>
                <p>All</p>
              </div>
            </Link>
            <Link
              onClick={currentTab("/easy")}
              to="/easy"
              className={`${
                active
                  ? activeCss
                  : offCss
              }`}
            >
              <div>
                <p>Easy</p>
              </div>
            </Link>
            <Link
              onClick={currentTab("/medium")}
              to="/medium"
              className={`${
                active
                  ? activeCss
                  : offCss
              }`}
            >
              <div>
                <p>Medium</p>
              </div>
            </Link>
            <Link
              onClick={currentTab("/hard")}
              to="/hard"
              className={`${
                active
                  ? activeCss
                  :offCss
              }`}
            >
              <div>
                <p>Hard</p>
              </div>
            </Link>

            <div>
              <div className="border rounded-lg p-3  hover:border-violet-500 ">
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
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="focus : outline-none text-gray-500"
                      type="search"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen mt-5">

            {window.location.pathname === "/" ? (
              <>
                {filterdItems.map((quetion) => (
                  <Quetion key={quetion._id} solved={false} quetion={quetion} />
                ))}
              </>
            ) : window.location.pathname === "/easy" ? (
              <>
              {easyQuetions.map((quetion) => (
                <Quetion key={quetion._id} solved={false} quetion={quetion} />
              ))}
            </>
            ) : window.location.pathname === "/medium" ? (
              <>
              {mediumQuetions.map((quetion) => (
                <Quetion key={quetion._id} solved={false} quetion={quetion} />
              ))}
            </>
            ) : (
              <>
                {hardQuetions.map((quetion) => (
                  <Quetion key={quetion._id} solved={false} quetion={quetion} />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllProblems;
