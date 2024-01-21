import React from 'react';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
);

export const options = {
    responsive: true,
    tension: 0,
    plugins: {
      legend: {
        display: false,
      }
      // title: {
      //   display: true,
      //   text: 'Performance',
      // },
    },
  };


export const data = {
  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      data: [7, 9, 8, 8, 6, 5],
      backgroundColor: 'rgba(255, 0, 0, 0)',
      borderColor: 'rgba(255, 0, 0, 1)',
      borderWidth: 1,
    },
  ],
};

export function RadarGraph() {
  return <Radar data={data} options={options}/>;
}