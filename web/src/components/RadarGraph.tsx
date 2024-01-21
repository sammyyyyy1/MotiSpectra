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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const primary = "#ffb784";
const onSurface = "#ece0da";
const outline = "#9f8d83";

interface Props {
  labels: string[];
  data: number[];
}

export default function RadarGraph({ labels, data }: Props) {
  return (
    <Radar
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: `${primary}50`,
            borderColor: primary,
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
