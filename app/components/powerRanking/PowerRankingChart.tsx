import React from "react";
import { RosterValue } from "~/types/Roster";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Player } from "~/types/Player";
import { LeagueSettings } from "~/types/LeagueSettings";
import { getPlayerValue, getRound } from "~/utils/players";
import { Pick } from "~/types/Picks";

interface PowerRankingChartProps {
  value: RosterValue[];
  leagueSetttings: LeagueSettings;
}

const PowerRankingChart: React.FC<PowerRankingChartProps> = ({
  value,
  leagueSetttings,
}) => {
  const sortedData = value.sort(
    (a: RosterValue, b: RosterValue) => b.value.total - a.value.total
  );
  console.log("Sorted data:", sortedData.length);
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "rgb(240,240,240)",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label: string[] = [];

            const team = context?.label;
            const position = context?.dataset?.label;
            const selectedTeam = value.filter(
              (item: RosterValue) => item.roster.teamName === team
            );


            if (context?.parsed?.y) {
              label.push(position + " value: " + context.parsed.y);
              label.push("");
            }
            if (selectedTeam.length > 0) {
              const players = selectedTeam[0].roster.players.sort(
                (a: Player, b: Player) =>
                  getPlayerValue(b, leagueSetttings.format) -
                  getPlayerValue(a, leagueSetttings.format)
              );
  
              players.forEach((current: Player) => {
                if (current.pos === position) {
                  label.push(
                    current.player +
                      " - Value: " +
                      getPlayerValue(current, leagueSetttings.format)
                  );
                }
              });
            }

            if ("PICKS" === position) {
              selectedTeam[0].roster.picks.forEach((pick: Pick) => {
                label.push(
                  pick.season +
                    " " +
                    getRound(pick.round) +
                    " - Value: " +
                    pick.value
                );
              });
            }
            return label;
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "rgb(240,240,240)",
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "rgb(240,240,240)",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const labels = sortedData.map((item: RosterValue) => item.roster.teamName);

  const data = {
    labels,
    datasets: [
      {
        label: "PICKS",
        data: sortedData.map((item: RosterValue) => item.value.totalPicks),
        backgroundColor: "orange",
      },
      {
        label: "TE",
        data: sortedData.map((item: RosterValue) => item.value.totalTE),
        backgroundColor: "yellow",
      },
      {
        label: "WR",
        data: sortedData.map((item: RosterValue) => item.value.totalWR),
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "RB",
        data: sortedData.map((item: RosterValue) => item.value.totalRB),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "QB",
        data: sortedData.map((item: RosterValue) => item.value.totalQB),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default PowerRankingChart;
