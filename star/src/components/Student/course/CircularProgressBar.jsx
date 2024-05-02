import React from 'react'

const CircularProgressBar = ({percentage, width, flip}) => {

    const calculateDashOffset = (percentage) => {
        const time = ((percentage+3)/100) * 60
        return 400 - (400 * time) / 100
    };

  return (
    <div>
        <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
                className="text-gray-200 stroke-current"
                strokeWidth="6"
                cx="50"
                cy="50"
                r="40"
                fill="transparent">

            </circle>

            <circle
                className={`${!flip ? (percentage>=50 ? (percentage>=80 ? 'text-green-500' : 'text-yellow-500') : 'text-red-500') : (percentage>=50 ? (percentage>=80 ? 'text-red-500' : 'text-yellow-500') : 'text-green-500')} progress-ring__circle stroke-current`}
                strokeWidth= {width}
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="400"
                strokeDashoffset={calculateDashOffset(percentage)}
            ></circle>

            <text
                x="50"
                y="50"
                textAnchor="middle"
                alignmentBaseline="middle"
                className='font-body text-lg font-bold'>
                {percentage} %
            </text>
        </svg>

    </div>
  )
}

export default CircularProgressBar