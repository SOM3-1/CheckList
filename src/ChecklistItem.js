import React from "react";
import './ChecklistItem.css';

const ChecklistItem = ({ id, label, checked, onToggle }) => {
  const handleToggle = (e) => {
    // Prevent double-toggling from checkbox or label clicks
    if (e.target.tagName !== 'INPUT') {
      e.preventDefault(); // Prevent default behavior from label
      onToggle(id);
    }
  };

  return (
    <div className="checklist-item" onClick={handleToggle}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="checkbox"
        onChange={() => onToggle(id)} // Ensure checkbox toggles on its own
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
};

export default ChecklistItem;
