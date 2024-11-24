import React from "react";
import './ChecklistItem.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const ChecklistItem = ({ id, label, checked, onToggle, strikeThroughEnabled}) => {
  return (
    <div className={`checklist-item ${checked ? 'checked' : ''}`} onClick={() => onToggle(id)}>
      <div className="icon">
        {checked ? (
          <CheckCircleIcon style={{ color: "#4caf50", fontSize: "24px" }} />
        ) : (
          <RadioButtonUncheckedIcon style={{ color: "#bdbdbd", fontSize: "24px" }} />
        )}
      </div>
      <label className="label" style={{  textDecoration: checked && strikeThroughEnabled ? "line-through" : "none",}}>{label}</label>
    </div>
  );
};

export default ChecklistItem;
