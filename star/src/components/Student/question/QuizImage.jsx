import React from 'react';
import { baseUrl } from '../../../APIS/BaseUrl';

const QuizImage = ({ imageUrl }) => {
  return (
    <div className="flex object-contain w-full h-full">
      <img
      crossOrigin="anonymous"
        src={`${baseUrl}teacherhub/`+imageUrl}
        alt="Quiz Image"
      />
    </div>
  );
};

export default QuizImage;
