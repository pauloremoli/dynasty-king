import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TeamStats } from "~/types/TeamStats";
import { Theme, useTheme } from "~/utils/ThemeProvider";

interface CustomLabelProps {
  x: number;
  y: number;
  fill: string;
  width: number;
  height: number;
  stroke: string;
  value: any;
}
const CustomLabel: React.FC<CustomLabelProps> = ({
  x,
  y,
  fill,
  width,
  height,
  value,
  ...props
}) => {
  if (value === 0) {
    return null;
  }

  return (
    <text
      x={x}
      y={y}
      dy={height / 2 + 6}
      dx={width / 2}
      fontSize="12"
      fill={fill}
      textAnchor="insideCenter"
    >
      {value}
    </text>
  );
};

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
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <XAxis type="number" fontSize={16} tick={false} />
          <YAxis
            type="category"
            dataKey="teamName"
            fontSize={14}
            width={100}
            tick={{ fill: theme == Theme.LIGHT ? "black" : "white" }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelStyle={{ color: "black" }} />
          <Legend />
          <Bar dataKey="wins" stackId="a" fill="#82ca9d">
            <LabelList
              dataKey="wins"
              position="inside"
              content={<CustomLabel />}
            />
          </Bar>
          {!isPostseason && (
            <Bar dataKey="ties" stackId="a" fill="rgb(53, 162, 235)">
              <LabelList
                dataKey="ties"
                position="inside"
                content={<CustomLabel />}
              />
            </Bar>
          )}
          <Bar dataKey="losses" stackId="a" fill="rgb(255, 99, 132)">
            <LabelList
              dataKey="losses"
              position="inside"
              content={<CustomLabel />}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StandingsChart;
