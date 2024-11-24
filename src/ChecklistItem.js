import React from "react";
import './ChecklistItem.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const ChecklistItem = ({ id, label, checked, onToggle }) => {
  return (
    <div className={`checklist-item ${checked ? 'checked' : ''}`} onClick={() => onToggle(id)}>
      <div className="icon">
        {checked ? (
          <CheckCircleIcon style={{ color: "#4caf50", fontSize: "24px" }} />
        ) : (
          <RadioButtonUncheckedIcon style={{ color: "#bdbdbd", fontSize: "24px" }} />
        )}
      </div>
      <label className="label">{label}</label>
    </div>
  );
};

export default ChecklistItem;
