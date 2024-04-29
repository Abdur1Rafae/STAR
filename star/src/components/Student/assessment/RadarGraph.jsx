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
    },
    scales: {
        r: {
            angleLines: {
                color: '#2C6491'
            },
            grid: {
                color:'#2C6491' 
            },
            pointLabels: {
                color: '#2C6491'
            }
        }
    }
};


export const generateChartData = (dataObj) => {
    const labels = Object.keys(dataObj);
    const datasets = [{
        data: labels.map(label => {
        const value = dataObj[label];
        return Math.round((value.correct / value.totalCount) * 100);
        }),
        borderColor: 'rgba(44, 100, 145, 1)',
        backgroundColor: 'rgba(197, 216, 109, 0.5)',
        borderWidth: 1,
    }];

    return { labels, datasets };
};

export function RadarGraph({inputData}) {
  return <Radar data={generateChartData(inputData)} options={options}/>;
}