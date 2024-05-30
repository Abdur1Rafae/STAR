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
  scales: {
    y: {
      min: 0,
      max: 100,
      title: {
        display: true,
      }
    }
  },
};


export function Graph({ inputData }) {
  const labels = inputData.map(item => item.title);
  const datasetValues = inputData.map(item => item.value);

  const data = {
    labels: labels,
    datasets: [
      {
        data: datasetValues,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}

const PerformanceGraph = ({inputData}) => {
  return (
    <div className='w-full md:w-1/3 h-72 bg-LightBlue rounded-lg drop-shadow-md'>
        <h2 className='text-md font-semibold p-2 mb-4'>Performance(%)</h2>
        <Graph inputData={inputData}/>
    </div>
  );
};

export default PerformanceGraph;
