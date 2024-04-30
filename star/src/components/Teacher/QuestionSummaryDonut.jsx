import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const options = {
    cutout: 50,
   
}

const additionalColors = [
    '#AEF0AE',
    '#F59496',
    '#87C4F5'
  ];
  
  

const borderColors = [
    'rgba(244,249,253,1)'
];



export const data = ({ inputData }) => {
    const values = inputData.map(item => item.value);

    return {
        datasets: [
            {
                label: '',
                data: values,
                backgroundColor: additionalColors,
                borderColor: borderColors,
                borderWidth: 5,
                
            },
        ]
        
    };
};

const LegendList = ({labels , values}) => (

    <div className='mt-2 flex md:flex-col flex-row flex-wrap gap-4 h-full justify-center'>
      {labels.map((label, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: additionalColors[index % additionalColors.length] }}
          ></div>
          <span className='text-xs'>{label}</span>
            <span className='text-xs ml-3 font-bold text-black'>{values[index]}</span>
        </div>
      ))}
    </div>
  );

export function QuestionDonutGraph({ inputData }) {
    const labels = inputData.map(item => (item.name));
    const values = inputData.map(item => (item.value));
    console.log(values)
    const sum = inputData.reduce((total, item) => total + item.value, 0);

    return (
        <div className='w-full flex justify-center items-center h-full gap-8'>
            <div className='h-48 flex items-center justify-center mb-4'>
                <Doughnut data={data({ inputData })} options={options}/>
                <div className='absolute flex flex-col items-center mt-3'>
                    <h4 className='text-2xl font-semibold text-DarkBlue'>{sum}</h4>
                    <p className='text-xs text-slate-400 '>Total Attempts</p>
                </div>
            </div>
            <LegendList labels={labels} values = {values}/>
        </div>
    )
}
