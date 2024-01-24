import React from 'react';
import { IoFlagOutline, IoFlag } from "react-icons/io5";

const FlagButton = ({ flagged, onToggleFlag }) => (
  <button className="focus:outline-none text-2xl" onClick={onToggleFlag}>
    {flagged ? <IoFlag color="red" /> : <IoFlagOutline />}
  </button>
);

export default FlagButton;
