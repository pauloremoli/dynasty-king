import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<{}> = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <>
      <div
        className={`min-h-screen w-full h-full flex flex-col bg-slate-900 ${
          darkMode && "dark"
        }`}
      >
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-center h-full w-full mb-auto md:mt-20">
            {children}
          </div>

          <div className="flex justify-center h-full w-full">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
