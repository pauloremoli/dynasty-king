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

interface PowerRankingChartProps {
  value: RosterValue[];
}

const PowerRankingChart: React.FC<PowerRankingChartProps> = ({
  value,
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
    plugins: {
      title: {
        display: true,
        text: "Power Ranking",
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
  };

  const labels = value.map((item: RosterValue) => item.roster.teamName);

  const data = {
    labels,
    datasets: [
      {
        label: "QB",
        data: value.map((item: RosterValue) => item.value.totalQB),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "RB",
        data: value.map((item: RosterValue) => item.value.totalRB),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "WR",
        data: value.map((item: RosterValue) => item.value.totalWR),
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "TE",
        data: value.map((item: RosterValue) => item.value.totalTE),
        backgroundColor: "yellow",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default PowerRankingChart;
