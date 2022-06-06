import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LeagueSettings } from "~/types/LeagueSettings";
import { Player } from "~/types/Player";
import { Roster, RosterValue } from "~/types/Roster";
import { TotalValue } from "~/types/RosterValue";
import { getPlayerValue } from "~/utils/players";
import { Theme, useTheme } from "~/utils/ThemeProvider";

interface PowerRankingChartProps {
  value: RosterValue[];
  leagueSetttings: LeagueSettings;
}

interface ChartData extends TotalValue {
  teamName: string;
}

interface CustomTooltipProps {
  active: boolean;
  payload: any;
  label: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="flex flex-col dark:bg-slate-900 bg-white dark:text-white p-4 rounded-lg"
        key={payload[0].payload.teamName}
      >
        <p className="font-semibold">{payload[0].payload.teamName}</p>
        <p>
          <span className="font-semibold">QBs: </span>{" "}
          {payload[0].payload.totalQB}
        </p>
        <p>
          <span className="font-semibold">RBs: </span>{" "}
          {payload[0].payload.totalRB}
        </p>
        <p>
          <span className="font-semibold">WRs: </span>{" "}
          {payload[0].payload.totalWR}
        </p>
        <p>
          <span className="font-semibold">TEs: </span>{" "}
          {payload[0].payload.totalTE}
        </p>
        <p>
          <span className="font-semibold">Picks: </span>{" "}
          {payload[0].payload.totalPicks}
        </p>
        <p>
          <span className="font-semibold ">Total value: </span>{" "}
          {payload[0].payload.total}
        </p>
      </div>
    );
  }

  return null;
};

const PowerRankingChart: React.FC<PowerRankingChartProps> = ({
  value,
  leagueSetttings,
}) => {
  const [theme] = useTheme();
  if (!value || value.length === 0)
    return (
      <div>
        <p className="text-white text-2xl text-center">No data available</p>
      </div>
    );

  const sortedData = value.sort(
    (a: RosterValue, b: RosterValue) => b.value.total - a.value.total
  );

  const data: ChartData[] = sortedData.map((value: RosterValue) => ({
    ...value.value,
    teamName: value.roster.teamName,
  }));

  return (
    <div style={{ width: "100%", height: data.length <= 12 ? 600 : 800 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={800}
          height={data.length <= 12 ? 600 : 800}
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            type="number"
            dataKey="total"
            fontSize={16}
            tick={{ fill: theme == Theme.LIGHT ? "black" : "white" }}
          />
          <YAxis
            type="category"
            dataKey="teamName"
            fontSize={14}
            width={70}
            tick={{ fill: theme == Theme.LIGHT ? "black" : "white" }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            labelStyle={{ color: "black" }}
            content={<CustomTooltip />}
          />
          <Legend />
          <Bar dataKey="totalQB" name="QBs" stackId="a" fill="#82ca9d" />
          <Bar
            dataKey="totalRB"
            name="RBs"
            stackId="a"
            fill="rgb(53, 162, 235)"
          />
          <Bar
            dataKey="totalWR"
            name="WRs"
            stackId="a"
            fill="rgb(100, 100, 255)"
          />
          <Bar
            dataKey="totalTE"
            name="TEs"
            stackId="a"
            fill="rgb(50, 0, 255)"
          />
          <Bar
            dataKey="totalPicks"
            name="Picks"
            stackId="a"
            fill="rgb(255, 99, 132)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PowerRankingChart;
