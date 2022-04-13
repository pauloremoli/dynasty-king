import React, { useState } from "react";
import Navbar from "./Navbar";


const Layout : React.FC<{}> = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <>
      <div
        className={`min-h-screen w-full h-full flex bg-slate-900 justify-center ${
          darkMode && "dark"
        }`}
      >
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
