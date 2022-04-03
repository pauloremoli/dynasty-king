import { FaCrown, FaHistory } from "react-icons/fa";
import { ImListNumbered, ImStatsBars2, ImPower } from "react-icons/im";
import { GiScales, GiPodium, GiSwordsPower } from "react-icons/gi";

const Index = () => {
  return (
    <>
      <div className="md:w-screen md:h-screen w-full h-full flex bg-slate-900 justify-center ">
        <div className="max-w-7xl flex justify-center flex-col">
          <div className="pt-12">
            <div className="flex justify-center">
              <FaCrown color="yellow" size={70} />
            </div>
            <h1 className="text-4xl font-bold text-center text-white pb-8">
              Dynasty King
            </h1>
            <p  className="text-xl font-thin text-center text-[#caf0f8] pb-20">
              Collection of tools that will help you become the King of your dynasty leagues.
            </p>
          </div>
          <div className="flex gap-8 flex-wrap md:justify-center w-full text-white max-w-5xl">
            <a href="/rankings">
              <div className="flex items-center justify-center rounded-lg overflow-hidden shadow-lg shadow-[#003450] bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
                <div className="px-6 py-6">
                  <div className="font-bold text-xl mb-2 text-center text-[#caf0f8]">
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

            <a href="/trade-calculator">
              <div className="flex  rounded-lg overflow-hidden shadow-lg shadow-[#003450] bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
                <div className="px-6 py-6">
                  <div className="font-bold text-xl mb-2 text-center text-[#caf0f8]">
                    Trade Calculator
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <GiScales size={40} color="#007ea7" />
                  </div>
                  <p className="text-gray-300 text-base pt-4">
                    Ajust calculator according to your preferences and
                    league settings.
                  </p>
                </div>
              </div>
            </a>

            <a href="/h2h">
              <div className="flex  rounded-lg overflow-hidden shadow-lg shadow-[#003450] bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
                <div className="px-6 py-6">
                  <div className="font-bold text-xl mb-2 text-center text-[#caf0f8]">
                    H2H Report
                  </div>

                  <div className="flex items-center justify-center py-2">
                    <GiSwordsPower size={40} color="#007ea7" />
                  </div>
                  <p className="text-gray-300 text-base pt-4">
                    H2H record against your league mates.
                  </p>
                </div>
              </div>
            </a>

            <a href="/duck-report">
              <div className="flex  rounded-lg overflow-hidden shadow-lg shadow-[#003450] bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
                <div className="px-6 py-6">
                  <div className="font-bold text-xl mb-2 text-center text-[#caf0f8]">
                    Duck Report
                  </div>

                  <div className="flex items-center justify-center py-2">
                    <GiPodium size={40} color="#007ea7" />
                  </div>
                  <p className="text-gray-300 text-base pt-4">
                    Cool statistics about your league.
                  </p>
                </div>
              </div>
            </a>

            <a href="/power-rankings">
              <div className="flex  rounded-lg overflow-hidden shadow-lg shadow-[#003450] bg-[#003459] flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
                <div className="px-6 py-6">
                  <div className="font-bold text-xl mb-2 text-center text-[#caf0f8]">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
