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
import { H2HStats } from "~/types/TeamStats";
import { Theme, useTheme } from "~/utils/ThemeProvider";

interface H2HChartProps {
  h2h: H2HStats[];
}

type ChartData = {
  wins: number;
  ties?: number;
  losses: number;
  winsPercentage: number;
  tiesPercentage: number;
  lossesPercentage: number;
  totalGames: number;
  teamName: string;
  teamId: number;
};
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
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="insideCenter"
    >
      {value}
    </text>
  );
};

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
          <span className="font-semibold">Wins: </span>{" "}
          {payload[0].payload.wins +
            " (" +
            payload[0].payload.winsPercentage +
            "%)"}
        </p>
        {payload[0].payload.ties > 0 ? (
          <p>
            <span className="font-semibold">Ties: </span>{" "}
            {payload[0].payload.ties +
              " (" +
              payload[0].payload.tiesPercentage +
              "%)"}
          </p>
        ) : null}
        <p>
          <span className="font-semibold">Losses: </span>{" "}
          {payload[0].payload.losses +
            " (" +
            payload[0].payload.lossesPercentage +
            "%)"}
        </p>
        <p>
          <span className="font-semibold">Total games: </span>{" "}
          {payload[0].payload.totalGames}
        </p>
      </div>
    );
  }

  return null;
};

const H2HChart: React.FC<H2HChartProps> = ({ h2h }) => {
  const [theme] = useTheme();

  const data: ChartData[] = h2h.map((stats: H2HStats) => {
    const totalGames =
      stats.standings.wins +
      (stats.standings?.ties ?? 0) +
      stats.standings.losses;

    return {
      ...stats.standings,
      totalGames,
      winsPercentage: (stats.standings.wins / totalGames) * 100,
      tiesPercentage: ((stats.standings?.ties ?? 0) / totalGames) * 100,
      lossesPercentage: (stats.standings.losses / totalGames) * 100,
      teamName: stats.teamName,
      teamId: stats.teamId,
    };
  });

  const sortedData: ChartData[] = data.sort((a: ChartData, b: ChartData) =>
    a.winsPercentage - b.winsPercentage === 0 ? b.lossesPercentage - a.lossesPercentage : b.winsPercentage - a.winsPercentage
  );

  if (!h2h || h2h.length === 0)
    return (
      <div>
        <p className="dark:text-white text-2xl text-center">
          No data available
        </p>
      </div>
    );

  return (
    <div style={{ width: "100%", height: sortedData.length <= 12 ? 600 : 800 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={800}
          height={sortedData.length <= 12 ? 600 : 800}
          data={sortedData}
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
          <Tooltip
            labelStyle={{ color: "black" }}
            content={<CustomTooltip />}
          />
          <Legend />
          <Bar dataKey="winsPercentage" stackId="a" fill="#82ca9d" name="Wins">
            <LabelList
              dataKey="wins"
              position="inside"
              content={<CustomLabel />}
            />
          </Bar>
          <Bar
            dataKey="tiesPercentage"
            stackId="a"
            fill="rgb(53, 162, 235)"
            name="Ties"
          >
            <LabelList
              dataKey="ties"
              position="inside"
              content={<CustomLabel />}
            />
          </Bar>
          <Bar
            dataKey="lossesPercentage"
            stackId="a"
            fill="rgb(255, 99, 132)"
            name="Losses"
          >
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

export default H2HChart;
