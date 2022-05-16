import React from "react";
import { TeamStats } from "~/types/TeamStats";
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

interface StandingsChartProps {
  teamStats: TeamStats[];
  isPostseason: boolean;
}
const StandingsChart: React.FC<StandingsChartProps> = ({
  teamStats,
  isPostseason,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: isPostseason ? "Postseason" : "Regular season",
      },
    },
  };

  const labels = teamStats.map((value: TeamStats) => value.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Wins",
        data: teamStats.map((stats: TeamStats) =>
          isPostseason ? stats.postseason.wins : stats.regularSeason.wins
        ),
        fontColor: "white",
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
      {
        label: "Ties",
        data: teamStats.map((stats: TeamStats) =>
          isPostseason ? stats.postseason.ties : stats.regularSeason.ties
        ),
        fontColor: "white",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.7)",
      },
      {
        label: "Losses",
        fontColor: "white",
        data: teamStats.map((stats: TeamStats) =>
          isPostseason ? stats.postseason.losses : stats.regularSeason.losses
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };
  return (
    <div className="font-lg text-white w-full">
      <Bar options={options} data={data} />
    </div>
  );
};

export default StandingsChart;