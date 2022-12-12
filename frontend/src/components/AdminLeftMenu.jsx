import React from 'react'
import { Link } from 'react-router-dom';

var listCss = "border text-center rounded-lg font-bold hover:shadow-md p-2";
const AdminLeftMenu = () => {
  return (
   <>
        <div className="w-[50%]">
          <h1 className="font-bold text-xl text-center text-blue-500">Admin Navigation</h1>
            <ul className="mt-10 flex flex-col gap-3 ">
              <Link to = '/admin/difficulties'>
                <li className={listCss}> 
                  Create Difficulties
                </li>
              </Link>
              <Link to = '/admin/add'>
                <li className={listCss}>
                  Add Problem
                </li>
              </Link>
              <Link>
                <li className={listCss}>
                  Manage Problems
                </li>
              </Link>
            </ul>
        </div>
   </>
  )
}

export default AdminLeftMenu;