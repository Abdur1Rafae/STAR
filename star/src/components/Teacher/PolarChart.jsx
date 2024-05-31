import React from 'react';
import { PolarArea } from 'react-chartjs-2';

const backgroundColor= [
  'rgba(255, 99, 132, 0.9)',
  'rgba(54, 162, 235, 0.9)',
  'rgba(255, 206, 86, 0.9)',
  'rgba(75, 192, 192, 0.9)',
  'rgba(153, 102, 255, 0.9)',
  'rgba(255, 159, 64, 0.9)',
  'rgba(205, 92, 92, 0.9)', 
  'rgba(0, 128, 0, 0.9)', 
  'rgba(255, 69, 0, 0.9)',
  'rgba(255, 215, 0, 0.9)',
  'rgba(75, 0, 130, 0.9)', 
  'rgba(255, 105, 180, 0.9)',
  'rgba(0, 255, 255, 0.9)', 
  'rgba(128, 128, 128, 0.9)',
  'rgba(255, 0, 255, 0.9)',
  'rgba(0, 0, 255, 0.9)',
  'rgba(255, 165, 0, 0.9)',
  'rgba(0, 255, 0, 0.9)',
  'rgba(255, 255, 0, 0.9)',
  'rgba(128, 0, 128, 0.9)',
];

const options = {
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: {
        display: false,
      },
    },
  },
};

export function PolarChart({inputData}) {
  const values = inputData.map(item => item.percentage * 100);

  const data = {
    datasets: [
      {
        label: 'Score',
        data: values,
        backgroundColor: backgroundColor.slice(0, inputData.length),
        borderWidth: 1,
      },
    ]
  };

  return (
    <div className='flex w-full h-full justify-between items-center mb-8'>
      <div className='w-1/2 flex justify-center'>
        <PolarArea data={data} options={options} />
      </div>
      <div className='w-full flex flex-col justify-center items-center gap-1'>
        <div className='flex gap-2 w-9/12 border-b-[1px] border-black'>
          <h4 className='text-sm font-medium w-1/2 flex justify-center'>Topic</h4>
          <h4 className='text-sm font-medium w-1/2 flex justify-center'>Percentage</h4>
        </div>
        {
          inputData.map((item, index) => (
            <div key={index} className='flex gap-2 w-9/12 text-[10px]'>
              <div className='w-1/2 flex gap-2 items-center'>
                <div className="w-[8px] h-[8px] rounded-full"
                  style={{ backgroundColor: backgroundColor[index % backgroundColor.length] }}
                ></div>
                <h4 className='flex justify-center'>{item._id}</h4>
              </div>
              <h4 className='w-1/2 flex justify-center items-center'>{Number(item.percentage * 100).toFixed(2)}%</h4>
            </div>
          ))
        }
      </div>
    </div>
  );
}
