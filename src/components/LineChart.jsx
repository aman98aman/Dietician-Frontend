
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering required components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const LineChart = ({User,Title}) => {
  // Sample data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: Title,
        data:[User],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
