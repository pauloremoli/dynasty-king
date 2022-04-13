import React, { useState } from "react";
import Navbar from "./Navbar";

interface LayoutProps {}

const Layout: React.PropsWithChildren<LayoutProps> = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState(false);
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
