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

const labels = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];

export const data = {
  labels,
  datasets: [
    {
      data: [23, 34, 84, 78 , 83, 45, 98, 64, 76, 23],
      backgroundColor: 'rgba(44, 100, 145, 1)',
      barThickness: 10,
      borderRadius: 10
    }
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} height={150} />;
}
