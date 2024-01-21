import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import getGraphGradient from "./getGraphGradient";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const onSurface = "#ece0da";
const outline = "#9f8d83";

interface Props {
  labels: string[];
  data: number[];
}

export default function RadarGraph({ labels, data }: Props) {
  console.log("graph render", {labels, data})
  return (
    <Radar
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: getGraphGradient,
            borderColor: getGraphGradient,
            borderWidth: 2,
          },
        ],
      }}
      options={{
        scales: {
          r: {
            grid: {
              color: outline,
            },
            angleLines: {
              color: outline,
            },
            ticks: {
              display: false,
              stepSize: 20,
            },
            pointLabels: {
              color: onSurface,
              font: {
                size: 14,
              },
            },
            min: 0,
            max: 100,
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
