import { FaCrown } from "react-icons/fa";

const Index = () => {
  return (
    <>
      <div className="md:w-screen md:h-screen w-full h-full flex bg-slate-900 justify-center ">
        <div className="max-w-7xl flex justify-center flex-col">
          <div className="pt-12">
            <div className="flex justify-center">
              <FaCrown color="yellow" size={70} />
            </div>
            <h1 className="text-4xl font-bold text-center text-white pb-20">
              Dynasty King
            </h1>
          </div>
          <div className="flex gap-4 flex-wrap md:justify-center w-full text-white max-w-5xl">
            <a href="/rankings">
              <div className="flex  rounded-lg overflow-hidden shadow-lg shadow-indigo-800 bg-indigo-500 flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
                <div className="px-6 py-6">
                  <div className="font-bold text-xl mb-2 text-center">
                    Dynasty Rankings
                  </div>
                  <p className="text-gray-100 text-base pt-4">
                    PPR rankings for Superflex, 1QB, rookies.
                  </p>
                </div>
              </div>
            </a>

            <a href="/trade-calculator">
              <div className="flex  rounded-lg overflow-hidden shadow-lg shadow-indigo-800 bg-indigo-500 flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
                <div className="px-6 py-6">
                  <div className="font-bold text-xl mb-2 text-center">
                    Trade Calculator
                  </div>
                  <p className="text-gray-300text-base pt-4">
                    Customize calculator according to your preferences and
                    league settings.
                  </p>
                </div>
              </div>
            </a>

            <a href="/h2h">
              <div className="flex  rounded-lg overflow-hidden shadow-lg shadow-indigo-800 bg-indigo-500 flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
                <div className="px-6 py-6">
                  <div className="font-bold text-xl mb-2 text-center">
                    H2H Report
                  </div>
                  <p className="text-gray-300text-base pt-4">
                    Check H2H records against each one of your league mates.
                  </p>
                </div>
              </div>
            </a>

            <a href="/duck-report">
              <div className="flex  rounded-lg overflow-hidden shadow-lg shadow-indigo-800 bg-indigo-500 flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
                <div className="px-6 py-6">
                  <div className="font-bold text-xl mb-2 text-center">
                    Duck Report
                  </div>
                  <p className="text-gray-300text-base pt-4">
                    Cool statistics about your league history.
                  </p>
                </div>
              </div>
            </a>

            <a href="/power-rankings">
              <div className="flex  rounded-lg overflow-hidden shadow-lg shadow-indigo-800 bg-indigo-500 flex-col w-full md:w-64 h-56  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300">
                <div className="px-6 py-6">
                  <div className="font-bold text-xl mb-2 text-center">
                    Power Rankings
                  </div>
                  <p className="text-gray-300text-base pt-4">
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
