import React, { useState, useEffect } from "react";
import * as GoogleCharts from "react-google-charts";

const UserChart = () => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("Line"); // Default chart type
  const [options, setOptions] = useState({});

  useEffect(() => {
    const chartData = [
      [new Date(2014, 0), -0.5, 5.7],
      [new Date(2014, 1), 0.4, 8.7],
      [new Date(2014, 2), 0.5, 12],
      [new Date(2014, 3), 2.9, 15.3],
      [new Date(2014, 4), 6.3, 18.6],
      [new Date(2014, 5), 9, 20.9],
      [new Date(2014, 6), 10.6, 19.8],
      [new Date(2014, 7), 10.3, 16.6],
      [new Date(2014, 8), 7.4, 13.3],
      [new Date(2014, 9), 4.4, 9.9],
      [new Date(2014, 10), 1.1, 6.6],
      [new Date(2014, 11), -0.2, 4.5],
    ];

    const materialOptions = {
      chart: {
        title:
          "Average Temperatures and Daylight in Iceland Throughout the Year",
      },
      width: 900,
      height: 500,
      series: {
        0: { axis: "Temps" },
        1: { axis: "Daylight" },
      },
      axes: {
        y: {
          Temps: { label: "Temps (Celsius)" },
          Daylight: { label: "Daylight" },
        },
      },
    };

    const classicOptions = {
      title: "Average Temperatures and Daylight in Iceland Throughout the Year",
      width: 900,
      height: 500,
      series: {
        0: { targetAxisIndex: 0 },
        1: { targetAxisIndex: 1 },
      },
      vAxes: {
        0: { title: "Temps (Celsius)" },
        1: { title: "Daylight" },
      },
      hAxis: {
        ticks: [
          new Date(2014, 0),
          new Date(2014, 1),
          new Date(2014, 2),
          new Date(2014, 3),
          new Date(2014, 4),
          new Date(2014, 5),
          new Date(2014, 6),
          new Date(2014, 7),
          new Date(2014, 8),
          new Date(2014, 9),
          new Date(2014, 10),
          new Date(2014, 11),
        ],
      },
      vAxis: {
        viewWindow: {
          max: 30,
        },
      },
    };

    setData(chartData);
    setOptions(chartType === "Line" ? materialOptions : classicOptions);
  }, [chartType]);

  const handleChartChange = () => {
    setChartType(chartType === "Line" ? "LineChart" : "Line");
  };

  return (
    <div>
      <GoogleCharts
        chartType={chartType}
        data={data}
        options={options}
        width="900px"
        height="500px"
      />
      <button onClick={handleChartChange}>
        Change to {chartType === "Line" ? "Classic" : "Line"}
      </button>
    </div>
  );
};

export default UserChart;
