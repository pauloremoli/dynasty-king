import { FaCrown } from "react-icons/fa";
import {
  GiDuck,
  GiScales,
  GiFaceToFace,
  GiAmericanFootballPlayer,
} from "react-icons/gi";
import { ImListNumbered, ImPower } from "react-icons/im";

const Index = () => {
  return (
    <>
      <div className="max-w-7xl flex justify-center flex-col py-20">
        <div>
          <div className="flex justify-center">
            <FaCrown color="yellow" size={70} />
          </div>
          <h1 className="text-4xl font-bold tracking-wider text-center text-white pb-8">
            Dynasty King
          </h1>
          <p className="text-xl font-thin text-center text-[#caf0f8] pb-20">
            Collection of tools that will help you become the King of your
            dynasty leagues.
          </p>
        </div>
        <div className="flex gap-8 flex-wrap md:justify-center w-full text-white max-w-5xl">
          <a href="/rankings/format/1QB/position/all">
            <div className="flex items-center justify-center rounded-lg overflow-hidden shadow-lg  bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
              <div className="px-6 py-6">
                <div className="font-semibold text-xl mb-2 text-center text-[#caf0f8]">
                  Dynasty Rankings
                </div>
                <div className="flex items-center justify-center py-2">
                  <ImListNumbered size={40} color="#007ea7" />
                </div>
                <p className="text-gray-100 text-base pt-4">
                  PPR rankings for SuperFlex, 1QB, rookies.
                </p>
              </div>
            </div>
          </a>

          <a href="/trade-calculator/format/1QB">
            <div className="flex  rounded-lg overflow-hidden shadow-lg  bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
              <div className="px-6 py-6">
                <div className="font-semibold text-xl mb-2 text-center text-[#caf0f8]">
                  Trade Calculator
                </div>
                <div className="flex items-center justify-center py-2">
                  <GiScales size={40} color="#007ea7" />
                </div>
                <p className="text-gray-300 text-base pt-4">
                  Ajust calculator according to your preferences and league
                  settings.
                </p>
              </div>
            </div>
          </a>

          <a href="/h2h">
            <div className="flex  rounded-lg overflow-hidden shadow-lg  bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
              <div className="px-6 py-6">
                <div className="font-semibold text-xl mb-2 text-center text-[#caf0f8]">
                  H2H Report
                </div>

                <div className="flex items-center justify-center py-2">
                  <GiFaceToFace size={40} color="#007ea7" />
                </div>
                <p className="text-gray-300 text-base pt-4">
                  H2H record against your league mates.
                </p>
              </div>
            </div>
          </a>

          <a href="/duck-report">
            <div className="flex  rounded-lg overflow-hidden shadow-lg  bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
              <div className="px-6 py-6">
                <div className="font-semibold text-xl mb-2 text-center text-[#caf0f8]">
                  Duck Report
                </div>

                <div className="flex items-center justify-center py-2">
                  <GiDuck size={40} color="#007ea7" />
                </div>
                <p className="text-gray-300 text-base pt-4">
                  Cool statistics about your league.
                </p>
              </div>
            </div>
          </a>

          <a href="/power-rankings">
            <div className="flex  rounded-lg overflow-hidden shadow-lg  bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
              <div className="px-6 py-6">
                <div className="font-semibold text-xl mb-2 text-center text-[#caf0f8]">
                  Power Rankings
                </div>
                <div className="flex items-center justify-center py-2">
                  <ImPower size={40} color="#007ea7" />
                </div>
                <p className="text-gray-300 text-base pt-4">
                  Team evaluation according to our rankings.
                </p>
              </div>
            </div>
          </a>
          <a href="/draft-report">
            <div className="flex  rounded-lg overflow-hidden shadow-lg  bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
              <div className="px-6 py-6">
                <div className="font-semibold text-xl mb-2 text-center text-[#caf0f8]">
                  Draft Report
                </div>
                <div className="flex items-center justify-center py-2">
                  <GiAmericanFootballPlayer size={40} color="#007ea7" />
                </div>
                <p className="text-gray-300 text-base pt-4">
                  Evaluate Hit/Miss per round for your past rookie drafts.
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Index;
