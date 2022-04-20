import React from "react";
import { Position } from "~/types/Position";
import { Format } from "~/types/Format";
import { Link } from "@remix-run/react";

interface FiltersProps {
  format: Format;
  position: Position;
  onlyRookies: boolean;
}

const Filters: React.FC<FiltersProps> = ({ format, position, onlyRookies }) => {
  return (
    <>
      <div className="flex p-4">
        <h3 className="">Format:</h3>
        <div className="px-4">
          <Link
            to={`/${onlyRookies ? "rookie_rankings" : "rankings"}/format/1QB/position/${position}`}
            className={`font-semibold hover:text-yellow-300 ${
              format === Format.FORMAT_1QB ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>1QB</span>
          </Link>
        </div>

        <div>
          <Link
            to={`/${onlyRookies ? "rookie_rankings" : "rankings"}/format/2QB/position/${position}`}
            className={`font-semibold hover:text-yellow-300 ${
              format === Format.FORMAT_2QB ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>SuperFlex (2QBs)</span>
          </Link>
        </div>
      </div>
      <div className="flex p-4 gap-4">
        <h3 className="">Position:</h3>
        <div>
          <Link
            to={`/rankings/format/${format}/position/all`}
            className={`font-semibold hover:text-yellow-300 ${
              position === Position.ALL && !onlyRookies? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>All</span>
          </Link>
        </div>
        <div>
          <Link
            to={`/rankings/format/${format}/position/QB`}
            className={`font-semibold hover:text-yellow-300 ${
              position === Position.QB && !onlyRookies ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>QB</span>
          </Link>
        </div>
        <div>
          <Link
            to={`/rankings/format/${format}/position/RB`}
            className={`font-semibold hover:text-yellow-300 ${
              position === Position.RB && !onlyRookies ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>RB</span>
          </Link>
        </div>
        <div>
          <Link
            to={`/rankings/format/${format}/position/WR`}
            className={`font-semibold hover:text-yellow-300 ${
              position === Position.WR && !onlyRookies ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>WR</span>
          </Link>
        </div>
        <div>
          <Link
            to={`/rankings/format/${format}/position/TE`}
            className={`font-semibold hover:text-yellow-300 ${
              position === Position.TE && !onlyRookies ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>TE</span>
          </Link>
        </div>
      </div>
      <div className="flex p-4 gap-4">
        <h3 className="">Rookies:</h3>
        <div>
          <Link
            to={`/rookie_rankings/format/${format}/position/all`}
            className={`font-semibold hover:text-yellow-300 ${
              position === Position.ALL && onlyRookies ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>All Rookies</span>
          </Link>
        </div>
        <div>
          <Link
            to={`/rookie_rankings/format/${format}/position/QB`}
            className={`font-semibold hover:text-yellow-300 ${
              position === Position.QB && onlyRookies  ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>QB</span>
          </Link>
        </div>
        <div>
          <Link
            to={`/rookie_rankings/format/${format}/position/RB`}
            className={`font-semibold hover:text-yellow-300 ${
              position === Position.RB && onlyRookies  ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>RB</span>
          </Link>
        </div>
        <div>
          <Link
            to={`/rookie_rankings/format/${format}/position/WR`}
            className={`font-semibold hover:text-yellow-300 ${
              position === Position.WR && onlyRookies  ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>WR</span>
          </Link>
        </div>
        <div>
          <Link
            to={`/rookie_rankings/format/${format}/position/TE`}
            className={`font-semibold hover:text-yellow-300 ${
              position === Position.TE && onlyRookies ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>TE</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Filters;
