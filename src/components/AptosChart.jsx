import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AptosChart({ prices }) {
  const chartData = {
    labels: prices.map((p) => new Date(p[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'APT Price (USD)',
        data: prices.map((p) => p[1]),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
      },
    ],
  };

  return <Line data={chartData} />;
}
