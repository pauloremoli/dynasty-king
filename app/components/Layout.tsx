import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<{}> = ({ children }: any) => {
  return (
    <>
      <div
        className={`min-h-screen w-full h-full flex flex-col dark:bg-slate-900 bg-gray-100`}
      >
        <Navbar />
        <div className="flex flex-col min-h-screen dark:bg-[#0A1931] bg-gray-100">
          <div className="flex justify-center h-full w-full">{children}</div>
          <div className="flex justify-center h-full w-full dark:bg-slate-900 bg-gray-100">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
