import { ScriptableContext } from "chart.js";

let width: number;
let height: number;
let gradient: CanvasGradient;

export default function getGraphGradient(
  context: ScriptableContext<"line"> | ScriptableContext<"radar">,
) {
  const { ctx, chartArea } = context.chart;
  if (!chartArea) return;

  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "hsl(0deg 100% 37%)");
    gradient.addColorStop(0.18, "hsl(12deg 94% 42%)");
    gradient.addColorStop(0.31, "hsl(23deg 88% 47%)");
    gradient.addColorStop(0.39, "hsl(35deg 90% 52%)");
    gradient.addColorStop(0.45, "hsl(45deg 100% 55%)");
    gradient.addColorStop(0.49, "hsl(50deg 100% 54%)");
    gradient.addColorStop(0.52, "hsl(55deg 100% 53%)");
    gradient.addColorStop(0.56, "hsl(60deg 100% 51%)");
    gradient.addColorStop(0.61, "hsl(72deg 96% 49%)");
    gradient.addColorStop(0.69, "hsl(87deg 96% 45%)");
    gradient.addColorStop(0.82, "hsl(102deg 96% 42%)");
    gradient.addColorStop(1, "hsl(117deg 96% 39%)");
  }

  return gradient;
}
