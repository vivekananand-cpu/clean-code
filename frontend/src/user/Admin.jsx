import React from "react";
import AdminLeftMenu from "../components/AdminLeftMenu";
import AdminRight from "../components/AdminRight";
import Navbar from "../components/Navbar";

const Admin = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen flex items-center justify-center">
        <div className="w-[70%] flex border-[1px] p-3">
          <AdminLeftMenu />
          <AdminRight />
        </div>
      </div>
    </>
  );
};

export default Admin;
