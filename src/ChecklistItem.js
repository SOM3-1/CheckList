import React from "react";
import './ChecklistItem.css'

const ChecklistItem = ({ id, label, checked, onToggle }) => {
  return (
    <div className="checklist-item" onClick={() => onToggle(id)}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="checkbox"
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
};

export default ChecklistItem;
