import React from 'react'

const CircularProgressBar = ({percentage}) => {

    const calculateDashOffset = (percentage) => {
        const time = ((percentage+3)/100) * 60
        return 400 - (400 * time) / 100
    };

  return (
    <div class="">
        <svg class="w-full h-full" viewBox="0 0 100 100">
            <circle
                className="text-gray-200 stroke-current"
                strokeWidth="7"
                cx="50"
                cy="50"
                r="40"
                fill="transparent">

            </circle>

            <circle
                className={`text-green-500 progress-ring__circle stroke-current`}
                strokeWidth="7"
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