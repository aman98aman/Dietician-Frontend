import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { decodeJwt } from "./middelwares.js";
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
  const [chartData, setChartData] = useState(null);


  function calculateBMI(weightEntries, heightInMeters) {
    // Ensure height is in meters for the BMI calculation
    console.log('heigth', heightInMeters)

    return weightEntries.map((entry) => {
      const { weight, createdAt } = entry;

      // Calculate BMI: weight (kg) / height^2 (m^2)
      const bmi = weight / (heightInMeters * heightInMeters);

      return {
        weight: parseFloat(bmi.toFixed(2)), // Replace weight with BMI and round to 2 decimal places
        createdAt, // Keep the date as is
      };
    });
  }

  // const data = [
  //   { weight: 53, createdAt: '2024-09-04T16:33:52.476Z' },
  //   { weight: 57, createdAt: '2024-09-04T16:33:52.476Z' },
  //   { weight: 59, createdAt: '2024-09-04T16:33:52.476Z' }
  // ]

  const token = localStorage.getItem("dietToken");
  const decoded = token ? decodeJwt(token) : null;



  useEffect(() => {
    if (decoded && decoded.userData) {
      const height = decoded.userData.height
      const heightInM = height / 100
      const bmiData = calculateBMI(data, heightInM)

      if (bmiData) {
        console.log('data', data)
        const formattedData = {
          labels: bmiData?.map((entry) => new Date(entry.createdAt).toLocaleDateString()), // Converting the dates to a readable format
          datasets: [
            {
              label: 'BMI',
              data: bmiData.map((entry) => entry.weight), // Use the weight as the data points
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        };
        setChartData(formattedData);
      }
    }


  }, [data]);

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
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Weight (kg)',
        },
      },
    },
  };

  return chartData ? <Line data={chartData} options={options} /> : <p>Loading chart...</p>;
};

export default BMI;
