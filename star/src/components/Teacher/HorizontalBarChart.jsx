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
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Topic Breakdown',
    },
  },
  scales: {
    x: {
    border:{dash: [2, 2]},
    grid: {
        color: '#aaa', // for the grid lines
        tickColor: '#000', // for the tick mark
        tickBorderDash: [2, 3], // also for the tick, if long enough
        tickLength: 10, // just to see the dotted line
        tickWidth: 2,
        offset: true,
        drawTicks: true, // true is default 
        drawOnChartArea: true ,// true is default 
    },
    },
    y :{
        grid:{
            display:false
        }
    },

  },
  
};

const labels = ['Operating System', 'History of Computers' , 'Number Systems' , 'Turing Maching'];

export const data = {
  labels,
  datasets: [
    {
      data: [28, 56, 49, 75, 81, 59, 73],
      borderColor: (context) => {
        const value = context.dataset.data[context.dataIndex];
        if (value < 40) {
          return '#FA938E';
        } else if (value >= 40 && value < 70) {
          return '#FBD377';
        } else {
          return '#6AE87D';
        }
      },
      backgroundColor: (context) => {
        const value = context.dataset.data[context.dataIndex];
        if (value < 40) {
          return '#FA938E';
        } else if (value >= 40 && value < 70) {
          return '#FBD377';
        } else {
          return '#6AE87D';
        }
      },
      borderRadius: 15,
    },
  ],
};

export default function HorizontalBarChart() {
  return <Bar className='font-body' options={options} data={data} />;
}
