import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

const options = {
    cutout: 60,
    maintainAspectRatio: false,
    aspectRatio: 1,
    responsive: true,
    tension: 0,
    plugins: {
        legend: {
        display: false,
        }
    },
};

const getColor = (percentage) => {
    if (percentage >= 80) {
        return 'rgba(0, 220, 0, 1)';
    } else if (percentage >= 50) {
        return 'rgba(255, 255, 0, 1)';
    } else {
        return 'rgba(255, 0, 0, 1)';
    }
};

export const data = ({ percentage }) => {
    const dataValue = [percentage, 100 - percentage];
    const backgroundColors = [getColor(percentage), 'rgba(169,169,169,0.6)'];

    return {
        datasets: [
            {
                data: dataValue,
                backgroundColor: backgroundColors,
                borderWidth: 0,
                circumference: 180
            },
        ],
    };
};

export function GaugeGraph({ percentage }) {
    return (
        <Doughnut data={data({ percentage })} options={options} className='-rotate-90'/>
    );
}
