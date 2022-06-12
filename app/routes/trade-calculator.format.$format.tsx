import { Team } from "@prisma/client";
import { ActionFunction, json, MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import {
  getLeagueSettings,
  getPlayers,
  getRostersValues,
} from "~/api/fleaflicker";
import Accordion from "~/components/Accordion";
import Settings from "~/components/tradeCalculator/Settings";
import AllPlayersTrade from "~/components/tradeCalculator/AllPlayersTrade";
import TradeAnalysis from "~/components/tradeCalculator/TradeAnalysis";
import { getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";
import styles from "~/styles/customSelect.css";
import { Format } from "~/types/Format";
import { LeagueSettings } from "~/types/LeagueSettings";
import { filterDataByFormat } from "~/utils/players";
import { Roster } from "~/types/Roster";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

interface ActionData {
  errors?: {
    league?: string;
  };
}

export const loader = async ({ params, request }) => {
  const { format } = params;

  const userId = await getUserId(request);
  let teams: Team[] = [];
  if (userId) {
    teams = await getTeamsByUserId(userId);
  }

  const result = await getPlayers();

  result.data = filterDataByFormat(result.data, format);
  return { players: result.data, teams };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const team = formData.get("league")?.toString();

  if (!team) {
    return json<ActionData>(
      { errors: { league: "League is invalid" } },
      { status: 400 }
    );
  }

  const { leagueId } = JSON.parse(team);
  const rosters = await getRostersValues(parseInt(leagueId));
  const leagueSettings = await getLeagueSettings(leagueId);
  return { rosters, leagueSettings };
};

export const meta: MetaFunction = () => {
  return {
    title: "Trade Calculator - Dynasty King",
  };
};

const TradeCalculator = () => {
  const params = useParams();
  const fetcher = useFetcher();
  const [format, setFormat] = useState(params.format as Format);
  const [totalValueA, setTotalValueA] = useState(0);
  const [totalValueB, setTotalValueB] = useState(0);
  const [rosters, setRosters] = useState<Roster[]>();
  const [myRoster, setMyRoster] = useState<Roster>();
  const [leagueSettings, setLeagueSettings] = useState<LeagueSettings>(
    fetcher?.data?.leagueSettings
  );
  const [selectedTeam, setSelectedTeam] = useState<Team>();

  useEffect(() => {
    setFormat(params.format as Format);
  }, [params]);

  useEffect(() => {
    if (!fetcher.data) {
      return;
    }
    const { rosters, leagueSettings } = fetcher.data;
    setRosters(rosters);
    console.log("selectedTeam", selectedTeam);
    console.log("rosters", rosters);

    const myTeam: Roster = rosters.find(
      (roster: Roster) => roster.teamName === selectedTeam?.teamName
    );
    console.log("myTeam", myTeam);

    setMyRoster(myTeam);
    setLeagueSettings(leagueSettings);
  }, [fetcher, selectedTeam]);

  const { players, teams } = useLoaderData();

  const setTeam = (team: Team) => {
    setSelectedTeam(team);
    fetcher.submit(
      {
        league: JSON.stringify(team),
      },
      { method: "post" }
    );
  };

  const setTotalValue = (team: string, total: number) => {
    team === "A" ? setTotalValueA(total) : setTotalValueB(total);
  };

  return (
    <div className="w-full h-full flex justify-center md:min-h-screen  animate-fadeIn px-4">
      <div className="flex flex-col w-full max-w-5xl gap-4 dark:text-gray-200 ">
        <h1 className="text-2xl font-semibold tracking-wide text-center pb-8 md:pt-20 pt-8">
          Trade Calculator
        </h1>

        <Accordion title="Settings">
          <Settings format={format} teams={teams} setTeam={setTeam} />
        </Accordion>
        <div className="flex flex-col md:flex-row max-w-5xl w-full justify-center gap-4 mb-4">
          {rosters ? (
            <>
              <AllPlayersTrade
                allPlayers={myRoster?.players ?? []}
                team={myRoster ? myRoster.teamName : "A"}
                format={format}
                setTotalValue={setTotalValue}
              />
              <AllPlayersTrade
                allPlayers={players}
                team={"B"}
                format={format}
                setTotalValue={setTotalValue}
              />
            </>
          ) : (
            <>
              <AllPlayersTrade
                allPlayers={players}
                team={"A"}
                format={format}
                setTotalValue={setTotalValue}
              />
              <AllPlayersTrade
                allPlayers={players}
                team={"B"}
                format={format}
                setTotalValue={setTotalValue}
              />
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row max-w-5xl w-full justify-center gap-4 mb-4">
          <TradeAnalysis totalValueA={totalValueA} totalValueB={totalValueB} />
        </div>
      </div>
    </div>
  );
};

export default TradeCalculator;
