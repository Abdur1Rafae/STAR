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

export const generateChartData = (dataObj) => {
  const labels = Object.keys(dataObj);
  const datasets = [{
    data: labels.map(label => {
      const value = dataObj[label];
      return Math.round((value.totalCorrect / value.count) * 100);
    }),
    borderColor: labels.map(label => {
      const value = dataObj[label];
      const data = Math.round((value.totalCorrect / value.count) * 100);
      if (data < 40) {
        return '#FA938E';
      } else if (data >= 40 && data < 70) {
        return '#FBD377';
      } else {
        return '#6AE87D';
      }
    }),
    backgroundColor: labels.map(label => {
      const value = dataObj[label];
      const data = Math.round((value.totalCorrect / value.count) * 100);
      if (data < 40) {
        return '#FA938E';
      } else if (data >= 40 && data < 70) {
        return '#FBD377';
      } else {
        return '#6AE87D';
      }
    }),
    borderRadius: 15,
  }];
  
  return { labels, datasets };
};

export default function HorizontalBarChart({inputData}) {
  return <Bar className='font-body' options={options} data={generateChartData(inputData)} />;
}
