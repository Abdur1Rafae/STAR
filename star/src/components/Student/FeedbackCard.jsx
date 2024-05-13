
import React from 'react';

const FeedbackCard = ({feedback}) => {

  return (
        <div className='p-4'>
        <h2 className="text-l font-bold pb-4">Feedback</h2>

        <p className='text-sm font-light'>
            {feedback}
        </p>
        </div>    
  );
};

export default FeedbackCard;
