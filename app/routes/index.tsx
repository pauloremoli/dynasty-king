import { FaCrown } from "react-icons/fa";

import Hero from "~/components/index/Hero";
import Tools from "~/components/index/Tools";

const Index = () => {
  
  return (
    <>
      <div className="h-full w-full max-w-5xl flex-col bg-slate-900 py-20">
        <Hero />
        <Tools/>
      </div>
    </>
  );
};

export default Index;
