import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    tension: 0,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales:{
        y:{
            grid:{
                display:false
            },
        },
        x:{
            grid:{
                display:false
            }
        },
    }
};

const labels = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%'];

const data = (inputData) => {
  return({
  labels,
  datasets: [
    {
      data: Object.values(inputData),
      backgroundColor: 'rgba(44, 100, 145, 1)',
      barThickness: 10,
      borderRadius: 10
    }]
  })
};

function categorizeAndCount(array) {
  const counts = {
    '0-10': 0,
    '10-20': 0,
    '20-30': 0,
    '30-40': 0,
    '40-50': 0,
    '50-60': 0,
    '60-70': 0,
    '70-80': 0,
    '80-90': 0,
    '90-100': 0
  };

  array.forEach(number => {
    const range = Math.floor(number / 10) * 10;
    counts[`${range}-${range + 10}`]++;
  });

  return counts;
}

export function BarChart({inputData}) {
  const transformedData = categorizeAndCount(inputData)
  return <Bar options={options} data={data(transformedData)} height={150} />;
}
