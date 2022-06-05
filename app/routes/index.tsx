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
      <div className="flex justify-center h-full w-full ">
        <div className="flex h-full w-full flex-col animate-fadeIn ">
          <Hero />
          <Tools />
        </div>
      </div>
    </>
  );
};

export default Index;
