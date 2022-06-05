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
import { TeamStats } from "~/types/TeamStats";
import { Theme, useTheme } from "~/utils/ThemeProvider";

interface StandingsChartProps {
  teamStats: TeamStats[];
  isPostseason: boolean;
}
const StandingsChart: React.FC<StandingsChartProps> = ({
  teamStats,
  isPostseason,
}) => {
  const data = teamStats.map((stats: TeamStats) => ({
    teamName: stats.name,
    wins: isPostseason ? stats.postseason.wins : stats.regularSeason.wins,
    losses: isPostseason ? stats.postseason.losses : stats.regularSeason.losses,
    ties: isPostseason ? 0 : stats.regularSeason.ties,
  }));
  const [theme] = useTheme();

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
            fontSize={16}
            tick={{ fill: theme == Theme.LIGHT ? "black" : "white" }}
          />
          <YAxis
            type="category"
            dataKey="teamName"
            fontSize={16}
            width={120}
            tick={{ fill: theme == Theme.LIGHT ? "black" : "white" }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelStyle={{ color: "black" }} />
          <Legend />
          <Bar dataKey="wins" stackId="a" fill="#82ca9d" />
          {!isPostseason && (
            <Bar dataKey="ties" stackId="a" fill="rgb(53, 162, 235)" />
          )}
          <Bar dataKey="losses" stackId="a" fill="rgb(255, 99, 132)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StandingsChart;
