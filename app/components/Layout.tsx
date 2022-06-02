import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<{}> = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState(true);

  const toogleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div
        className={`min-h-screen w-full h-full flex flex-col dark:bg-slate-900 bg-gray-100 ${
          darkMode && "dark"
        }`}
      >
        <Navbar darkMode={darkMode} toogleDarkMode={toogleDarkMode} />
        <div className="flex flex-col min-h-screen dark:bg-[#0A1931] bg-gray-100">
          <div className="flex justify-center h-full w-full mb-auto">
            {children}
          </div>
          <div className="flex justify-center h-full w-full dark:bg-slate-900 bg-gray-100">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
