import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  tension: 0.4,
  plugins: {
    legend: {
    display: false,
    }
  },
    // title: {
    //   display: true,
    //   text: 'Performance',
    // },
};

const labels = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7'];
const getRandomNumberFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => getRandomNumberFromRange(0, 100)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function Graph() {
  return <Line options={options} data={data} className=''/>;
}

const PerformanceGraph = () => {
  return (
    <div className='w-full md:w-1/3 h-72 bg-LightBlue rounded-lg drop-shadow-md'>
        <h2 className='text-md font-semibold p-2 mb-4'>Performance</h2>
        <Graph />
    </div>
  );
};

export default PerformanceGraph;
