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
import { faker } from '@faker-js/faker';

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
      font: {
        size: 16, // Increase the font size
        family: 'Inter', // Optional: you can specify font family
      },
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
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
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
  return <Bar options={options} data={data} />;
}
