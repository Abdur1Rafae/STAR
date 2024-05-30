import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  tension: 0,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales:{
    y: {
      beginAtZero: true,
      min: 0,
      max: 100,
      grid: {
        display: false
      },
      ticks: {
        stepSize: 10
      }
    },
    x: {
      grid: {
        display: false
      }
    },
  }
};

function generateData(inputData) {
  const labels = Object.keys(inputData);
  const data = []
  labels.forEach(label => {
    console.log(label)
    const percentage = (inputData[label].correct / inputData[label].totalCount) * 100;
    data.push(percentage)
  });

  return { labels, datasets:[{
    data: data,
    backgroundColor: 'rgba(44, 100, 145, 1)',
    barThickness: 20,
    borderRadius: 10
  }]};
}

export function PercentageBarChart({ inputData }) {
  const data = generateData(inputData);
  return <Bar options={options} data={data} height={150} />;
}
