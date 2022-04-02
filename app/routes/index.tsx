import { FaCrown } from "react-icons/fa";

const Index = () => {
  return (
    <div className="w-screen h-screen flex bg-slate-900 justify-center p-20 flex-col">
      <div className="flex justify-center pt-20">
        <FaCrown color="yellow" size={70} />
      </div>
      <h1 className="text-4xl font-bold text-center text-white pb-20">
        Dynasty King
      </h1>

      <div className="flex gap-8 flex-wrap justify-center">
        <a href="/rankings">
          <div className="flex max-w-sm rounded overflow-hidden shadow-lg bg-amber-200 flex-col w-64 h-56  hover:scale-105">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">
                Dynasty Rankings
              </div>
              <p className="text-gray-900 text-base pt-4">
                PPR rankings for Superflex, 1QB, rookies.
              </p>
            </div>
          </div>
        </a>

        <a href="/trade-calculator">
          <div className="flex max-w-sm rounded overflow-hidden shadow-lg bg-indigo-500 flex-col w-64 h-56  hover:scale-105">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">
                Trade Calculator
              </div>
              <p className="text-gray-900 text-base pt-4">
                Customize calculator according to your preferences and league
                settings.
              </p>
            </div>
          </div>
        </a>

        <a href="/h2h">
          <div className="flex max-w-sm rounded overflow-hidden shadow-lg bg-lime-300 flex-col w-64 h-56  hover:scale-105">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">
                H2H Report
              </div>
              <p className="text-gray-900 text-base pt-4">
                Check H2H records against each one of your league mates.
              </p>
            </div>
          </div>
        </a>

        <a href="/league-history">
          <div className="flex max-w-sm rounded overflow-hidden shadow-lg bg-emerald-200 flex-col w-64 h-56  hover:scale-105">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">
                Duck Report
              </div>
              <p className="text-gray-900 text-base pt-4">
                Cool statistics about your league history.
              </p>
            </div>
          </div>
        </a>

        <a href="/power-rankings">
          <div className="flex max-w-sm rounded overflow-hidden shadow-lg bg-cyan-600 flex-col w-64 h-56  hover:scale-105">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">
                Power Rankings
              </div>
              <p className="text-gray-900 text-base pt-4">
                Team evaluation according to our rankings.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Index;
