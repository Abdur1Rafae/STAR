import React from 'react';

const SureDelete = ({ onCancel, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete?</h2>
        <div className="buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default SureDelete;
