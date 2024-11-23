import React from "react";
import './ChecklistItem.css'

const ChecklistItem = ({ id, label, checked, onToggle }) => {
  return (
    <div className="checklist-item">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onToggle(id)}
        className="checkbox"
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
};

export default ChecklistItem;
