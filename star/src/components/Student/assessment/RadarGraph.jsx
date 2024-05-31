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
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return context.dataset.originalLabels[context.dataIndex] + ': ' + context.raw + '%';
                }
            }
        }
    },
    scales: {
        r: {
            min: 0,
            max: 100,
            ticks: {
                beginAtZero: true,
                stepSize: 20, // Steps of 20
            },
            angleLines: {
                color: '#2C6491'
            },
            grid: {
                color: '#2C6491'
            },
            pointLabels: {
                color: '#2C6491'
            }
        }
    }
};

const trimLabel = (label) => {
    return label.length > 10 ? label.slice(0, 8) + '...' : label;
};

export const generateChartData = (dataObj) => {
    const labels = Object.keys(dataObj).map(trimLabel);
    const originalLabels = Object.keys(dataObj); // Store original labels
    const datasets = [{
        data: originalLabels.map(label => {
            const value = dataObj[label];
            return Math.round((value.correct / value.totalCount) * 100);
        }),
        borderColor: 'rgba(44, 100, 145, 1)',
        backgroundColor: 'rgba(197, 216, 109, 0.5)',
        borderWidth: 1,
        pointRadius: 5,
        originalLabels: originalLabels, // Add original labels to dataset
    }];

    return { labels, datasets };
};

export function RadarGraph({ inputData }) {
    return <Radar data={generateChartData(inputData)} options={options} />;
}
