import React from 'react'
import { isAuthenticated } from '../helper/auth';

const AdminRight = () => {
    const {user : {name,userEmail}} = isAuthenticated();
  return (
    <div className="w-[50%]">
        <h1 className="font-bold text-xl text-center text-blue-500">Admin Information</h1>
        <div className="mt-10 ml-10 flex flex-col gap-3">
            <div className="flex gap-3 border items-center rounded-lg p-2">
                <p className="font-bold">Name :</p>
                <p className="font-bold text-sm text-gray-500">{name}</p>
            </div>
            <div className="flex gap-3 border items-center rounded-lg p-2">
                <p className="font-bold">Email :</p>
                <p className="font-bold text-sm text-gray-500">{userEmail}</p>
            </div>
            <div className="border rounded-lg p-2 font-bold bg-red-500 text-white text-center">
                <p>Admin Area</p>
            </div>
        </div>
    </div>
  )
}

export default AdminRight;