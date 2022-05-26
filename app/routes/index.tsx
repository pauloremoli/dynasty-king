import { MetaFunction } from "@remix-run/node";
import Hero from "~/components/index/Hero";
import Tools from "~/components/index/Tools";

export const meta: MetaFunction = () => {
  return {
    title: "Dynasty King",
  };
};

const Index = () => {
  return (
    <>
      <div className="flex justify-center h-full w-full">
        <div className="flex justify-center h-full w-full max-w-5xl flex-col bg-slate-900 py-2 md:pb-20">
          <Hero />
          <Tools />
        </div>
      </div>
    </>
  );
};

export default Index;
