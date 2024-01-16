import React from 'react';
import { AiOutlineFlag, AiFillFlag } from 'react-icons/ai';

const FlagButton = ({ flagged, onToggleFlag }) => (
  <button className="focus:outline-none" onClick={onToggleFlag}>
    {flagged ? <AiFillFlag color="red" /> : <AiOutlineFlag />}
  </button>
);

export default FlagButton;
