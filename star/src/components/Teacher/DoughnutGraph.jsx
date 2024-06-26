import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import { MdArrowDownward } from 'react-icons/md';
Chart.register(ArcElement);

const options = {
    cutout: 60,
}

const additionalColors = [
    'rgba(255, 0, 0, 1)',         // Red
    'rgba(255, 165, 0, 1)',       // Orange
    'rgba(255, 255, 0, 1)',       // Yellow
    'rgba(0, 255, 0, 1)',         // Lime Green
    'rgba(0, 128, 0, 1)',         // Green
    'rgba(0, 255, 255, 1)',       // Cyan
    'rgba(0, 128, 128, 1)',       // Teal
    'rgba(0, 0, 255, 1)',         // Blue
    'rgba(0, 0, 128, 1)',         // Navy Blue
    'rgba(255, 0, 255, 1)',       // Magenta
    'rgba(128, 0, 128, 1)',       // Purple
    'rgba(255, 192, 203, 1)',     // Pink
    'rgba(255, 215, 0, 1)',       // Gold
    'rgba(210, 105, 30, 1)',      // Chocolate
    'rgba(165, 42, 42, 1)',       // Brown
    'rgba(75, 0, 130, 1)',        // Indigo
    'rgba(128, 0, 0, 1)',         // Maroon
    'rgba(70, 130, 180, 1)',      // Steel Blue
    'rgba(46, 139, 87, 1)',       // Sea Green
    'rgba(138, 43, 226, 1)',      // Blue Violet
    'rgba(178, 34, 34, 1)',       // Fire Brick
    'rgba(85, 107, 47, 1)',       // Dark Olive Green
    'rgba(32, 178, 170, 1)',      // Light Sea Green
    'rgba(147, 112, 219, 1)',     // Medium Purple
    'rgba(255, 99, 71, 1)'        // Tomato
  ];
  
  

const borderColors = [
    'rgba(255,255,255,1)'
];



export const data = ({ inputData }) => {
  const values = Object.values(inputData);

  return {
    datasets: [
      {
        label: '# of Questions',
        data: values,
        backgroundColor: additionalColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ]
  };
};

const LegendList = ({labels}) => {
  const [display, setDisplay] = useState(false)
  return (
  <div className='mt-2 self-start flex md:flex-col flex-row flex-wrap gap-4 w-full'>
    <button className='w-full md:hidden flex justify-between border-[1px] border-black p-2 items-center' onClick={()=>{setDisplay((prev)=>(!prev))}}>
      <p>{display ? 'Hide Topics' : 'Show Topics'}</p>
      <MdArrowDownward className={`transform transition-transform ${display ? 'rotate-180' : ''}`}/>
    </button>
    {Object.entries(labels).map(([key, value], index) => (
      <div key={index} className={`flex items-center w-full ${display ? '' : 'h-0 hidden md:flex md:h-full'} transition-all duration-200 ease-linear`}>
        <div
          className="w-2 h-2 rounded-full mr-2"
          style={{ backgroundColor: additionalColors[index % additionalColors.length] }}
        ></div>
        <div className='flex justify-between w-full gap-4 text-xs font-medium'>
          <p>{key}: </p>
          <p>{value}</p>
        </div>
      </div>
    ))}
  </div>
  )
};


export function DoughnutGraph({ inputData }) {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='h-48 flex items-center justify-center mb-4'>
                <Doughnut data={data({ inputData })} options={options}/>
                <div className='absolute flex flex-col items-center mt-3'>
                    <p className=''>Total Topics</p>
                    <h4 className='text-2xl font-semibold'>{Object.keys(inputData).length}</h4>
                </div>
            </div>
            <LegendList labels={inputData}/>
        </div>
    )
}
