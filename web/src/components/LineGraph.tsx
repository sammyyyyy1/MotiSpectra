import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import getGraphGradient from "./getGraphGradient";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const onSurface = "#ece0da";
const outline = "#9f8d83";

interface Props {
  labels: string[];
  data: number[];
}

export default function LineGraph({ labels, data }: Props) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: "#fff",
            borderColor: getGraphGradient,
            borderWidth: 4,
          },
        ],
      }}
      options={{
        scales: {
          x: {
            grid: {
              color: outline,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            grid: {
              color: outline,
            },
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
