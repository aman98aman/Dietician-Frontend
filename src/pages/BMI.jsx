// src/BmiChart.js
import React from 'react';
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

const BMI = ({ data }) => {
  
  console.log("Inside BMI", data?.data);

  const chartData = {
    labels: data?.data?.map((value) => value),
    datasets: [
      {
        label: 'BMI',
        data: data?.data?.map((value) => value),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'BMI Over Time',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default BMI;
