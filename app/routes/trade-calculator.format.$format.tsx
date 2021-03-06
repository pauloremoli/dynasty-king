import { css } from "@emotion/react";
import { Team } from "@prisma/client";
import { ActionFunction, MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import {
  getLeagueSettings,
  getPlayers,
  getRostersValues,
} from "~/api/fleaflicker";
import AllPlayersTrade from "~/components/tradeCalculator/AllPlayersTrade";
import LeagueTrade from "~/components/tradeCalculator/LeagueTrade";
import Settings from "~/components/tradeCalculator/Settings";
import TradeAnalysis from "~/components/tradeCalculator/TradeAnalysis";
import { getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";
import styles from "~/styles/customSelect.css";
import { CustomSettings, FuturePickValue } from "~/types/CustomSettings";
import { Format } from "~/types/Format";
import { LeagueSettings } from "~/types/LeagueSettings";
import { Player } from "~/types/Player";
import { RosterValue } from "~/types/Roster";
import { adjustValueToSettings, sortByDataByFormat } from "~/utils/players";
import { Theme, useTheme } from "~/utils/ThemeProvider";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader = async ({ params, request }) => {
  const { format } = params;

  const userId = await getUserId(request);
  let teams: Team[] = [];
  if (userId) {
    teams = await getTeamsByUserId(userId);
  }

  const result = await getPlayers();

  result.data = sortByDataByFormat(result.data, format);
  return { players: result.data, teams };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const team: FormDataEntryValue | null = formData.get("league");
  if (!team) {
    return {};
  }
  const parsedTeam: Team | null = JSON.parse(team.toString());

  if (!parsedTeam) {
    return {};
  }
  const { leagueId } = parsedTeam;
  const rosters = await getRostersValues(leagueId);
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
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [rosters, setRosters] = useState<RosterValue[]>();
  const [myRoster, setMyRoster] = useState<RosterValue | null>();
  const [leagueSettings, setLeagueSettings] = useState<LeagueSettings | null>(
    fetcher?.data?.leagueSettings
  );
  const [selectedTeam, setSelectedTeam] = useState<Team | null>();
  const [teamB, setTeamB] = useState<string | null>();
  const [theme] = useTheme();
  const [customSettings, setCustomSettings] = useState<CustomSettings>();

  const data = useLoaderData();

  useEffect(() => {
    setPlayers(data.players);
    setTeams(data.teams);
  }, [data]);

  useEffect(() => {
    setPlayers(
      adjustValueToSettings(
        data.players,
        customSettings?.pprTE ?? 1,
        customSettings?.futurePickValue ?? FuturePickValue.MEDIUM
      )
    );
  }, [data, customSettings]);

  useEffect(() => {
    setFormat(params.format as Format);
  }, [params]);

  useEffect(() => {
    if (!fetcher.data) {
      return;
    }
    const { rosters, leagueSettings } = fetcher.data;

    if (!rosters) {
      setRosters([]);
      setMyRoster(null);
      setLeagueSettings(null);
      return;
    }

    const myTeam: RosterValue = rosters.find(
      (rosterValue: RosterValue) =>
        rosterValue.roster.teamName === selectedTeam?.teamName
    );

    if (!selectedTeam) {
      setRosters([]);
      setMyRoster(null);
      setLeagueSettings(null);
      return;
    }

    const filtered: RosterValue[] = rosters.filter(
      (rosterValue: RosterValue) =>
        rosterValue.roster.teamName !== selectedTeam.teamName
    );

    setRosters(filtered);
    setMyRoster(myTeam);
    setLeagueSettings(leagueSettings);
  }, [fetcher, selectedTeam]);

  const setTeam = (team: Team | null) => {
    setSelectedTeam(team);
    fetcher.submit(
      {
        league: JSON.stringify(team),
      },
      { method: "post" }
    );
  };

  const setTotalValue = (isLeftTeam: boolean, total: number) => {
    isLeftTeam ? setTotalValueA(total) : setTotalValueB(total);
  };

  const override = css`
    display: block;
    margin: auto;
    border-color: white;
  `;

  return (
    <div className="w-full h-full flex justify-center md:min-h-screen  animate-fadeIn px-4">
      <div className="flex flex-col w-full max-w-5xl gap-4 dark:text-gray-200 pb-20">
        <h1 className="text-2xl font-semibold tracking-wide text-center pb-8 md:pt-20 pt-8">
          Trade Calculator{myRoster ? " - " + selectedTeam?.leagueName : ""}
        </h1>

        {fetcher.state === "submitting" || fetcher.state === "loading" ? (
          <div className="flex w-full h-full items-center justify-center">
            <GridLoader
              color={theme == Theme.LIGHT ? "black" : "#ffffff"}
              loading={true}
              css={override}
              size={15}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row max-w-5xl w-full justify-center gap-4 mb-4">
              {rosters && rosters.length > 0 ? (
                <>
                  <LeagueTrade
                    futurePickValue={
                      customSettings?.futurePickValue ?? FuturePickValue.MEDIUM
                    }
                    myRoster={myRoster}
                    setTeamB={setTeamB}
                    setTotalValue={setTotalValue}
                    leagueSettings={leagueSettings!}
                    isLeftTeam={true}
                    allPlayers={players}
                  />
                  <LeagueTrade
                    futurePickValue={
                      customSettings?.futurePickValue ?? FuturePickValue.MEDIUM
                    }
                    rosters={rosters}
                    setTeamB={setTeamB}
                    setTotalValue={setTotalValue}
                    leagueSettings={leagueSettings!}
                    isLeftTeam={false}
                    allPlayers={players}
                  />
                </>
              ) : (
                <>
                  <AllPlayersTrade
                    allPlayers={players}
                    teamName={"Team A"}
                    isLeftTeam={true}
                    format={format}
                    setTotalValue={setTotalValue}
                    pprTE={customSettings?.pprTE ?? 0}
                  />
                  <AllPlayersTrade
                    allPlayers={players}
                    teamName={"Team B"}
                    isLeftTeam={false}
                    format={format}
                    setTotalValue={setTotalValue}
                    pprTE={customSettings?.pprTE ?? 0}
                  />
                </>
              )}
            </div>

            <div className="flex flex-col md:flex-row max-w-5xl w-full justify-center gap-4 mb-4">
              <TradeAnalysis
                totalValueA={totalValueA}
                teamAName={selectedTeam?.teamName ?? "Team A"}
                totalValueB={totalValueB}
                teamBName={teamB ?? "Team B"}
              />
            </div>
          </>
        )}
        <Settings
          format={format}
          teams={teams}
          setTeam={setTeam}
          setCustomSettings={setCustomSettings}
        />
      </div>
    </div>
  );
};

export default TradeCalculator;
