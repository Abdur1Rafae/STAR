import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const options = {
    cutout: 50,
}

const additionalColors = [
    'rgba(255,96,88,1)',
    'rgba(71,163,237,1)',
    'rgba(255,129,0,1)'
  ];
  
  

const borderColors = [
    'rgba(244,249,253,1)'
];



export const data = ({ inputData }) => {
    const values = inputData.map(item => item.value);

    return {
        datasets: [
            {
                label: '# of Students',
                data: values,
                backgroundColor: additionalColors,
                borderColor: borderColors,
                borderWidth: 5,
            },
        ]
    };
};

const LegendList = ({labels}) => (
    <div className='mt-2 flex md:flex-col flex-row flex-wrap gap-4 h-full justify-center'>
        <h4 className='text-sm font-medium'>Participants Dichotomy</h4>
      {labels.map((label, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: additionalColors[index % additionalColors.length] }}
          ></div>
          <span className='text-xs'>{label}</span>
        </div>
      ))}
    </div>
  );

export function StudentDonutGraph({ inputData }) {
    const labels = inputData.map(item => (item.name));
    return (
        <div className='w-full flex justify-center items-center h-full gap-8'>
            <div className='h-48 flex items-center justify-center mb-4'>
                <Doughnut data={data({ inputData })} options={options}/>
                <div className='absolute flex flex-col items-center mt-3'>
                    <h4 className='text-2xl font-semibold text-DarkBlue'>72</h4>
                    <p className='text-slate-400'>Students</p>
                </div>
            </div>
            <LegendList labels={labels}/>
        </div>
    )
}
