import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  Outlet,
  useFetcher,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { SelectedOptionValue, SelectSearchOption } from "react-select-search";
import { getStats } from "~/api/fleaflicker";
import AllTimeRecordPostseason from "~/components/duck-report/AllTimeRecordPostseason";
import AllTimeRecord from "~/components/duck-report/AllTimeRecordRegularSeason";
import DuckReportComponent from "~/components/duck-report/DuckReportComponent";
import YearlyFinish from "~/components/duck-report/YearlyFinish";
import SelectLeague from "~/components/SelectLeague";
import { getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";

import styles from "~/styles/customSelect.css";
import { Team } from "~/types/Team";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

interface ActionData {
  errors?: {
    league?: string;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url).pathname;

  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const teams = await getTeamsByUserId(userId);
  const leagueId = teams[0].leagueId;

  const stats = await getStats(leagueId);

  return { teams, stats, url };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const leagueId = formData.get("league")?.toString();

  if (!leagueId) {
    return json<ActionData>(
      { errors: { league: "League is invalid" } },
      { status: 400 }
    );
  }

  return redirect("/duck-report/league/" + leagueId);
};

const DuckReport = () => {
  const { teams, stats, url } = useLoaderData();
  const [selectedLeague, setSelectedLeague] = useState(
    teams.length > 0 ? teams[0].leagueId : ""
  );
  const [selectedLeagueName, setSelectedLeagueName] = useState(
    teams.length > 0 ? teams[0].leagueName : ""
  );
  const submit = useSubmit();

  const handleSelection = (e: ChangeEventHandler<HTMLSelectElement>) => {
    const leagueId = e.target.value;
    setSelectedLeague(leagueId);
  };

  useEffect(() => {
    if (!selectedLeague) return;
    const league = teams.find(
      (team: Team) => team.leagueId === parseInt(selectedLeague)
    );
    setSelectedLeagueName(league.leagueName);
  }, [selectedLeague, teams]);

  const handleChange = (event: any) => {
    submit(event.currentTarget, { replace: true });
  };

  return (
    <>
      <div className="flex flex-col md:max-w-5xl w-full h-full md:w-5xl pt-12 text-white items-center justify-center">
        <h1 className="text-2xl font-bold text-center">{`Duck Report${
          selectedLeagueName ? " - " + selectedLeagueName : ""
        }`}</h1>
        <div className="flex w-full justify-start">
          <Form method="post" onChange={handleChange}>
            <SelectLeague teams={teams} handleSelection={handleSelection} />
          </Form>
        </div>
        <div className="flex flex-col  pt-12 w-full">
          {url === "/duck-report" ? (
            <DuckReportComponent stats={stats} />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
};

export default DuckReport;
