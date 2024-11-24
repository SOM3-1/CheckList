import React, { useState } from "react";
import ChecklistItem from "./ChecklistItem";
import './Checklist.css'

const Checklist = () => {
  const useCases = [
    { id: "UC1", name: "Create Account" },
    { id: "UC2", name: "Log in" },
    { id: "UC3", name: "View Home Screen" },
    { id: "UC4", name: "View User Dashboard" },
    { id: "UC5", name: "Filter/ Search Study Sessions" },
    { id: "UC6", name: "Create Study Session" },
    { id: "UC7", name: "Display Study Session details" },
    { id: "UC8", name: "Enroll in a study session" },
    { id: "UC9", name: "Leave a Study Session" },
    { id: "UC10", name: "Delete Study Session" },
    { id: "UC11", name: "Receive Session Reminders" },
    { id: "UC12", name: "Log out" },
  ];

  const [checkedStates, setCheckedStates] = useState(
    useCases.map(() => false) 
  );

  const handleToggle = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  return (
    <div className="checklist">
      {useCases.map((useCase, index) => (
        <ChecklistItem
          key={useCase.id}
          id={useCase.id}
          label={`${useCase.id}: ${useCase.name}`}  
          checked={checkedStates[index]}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Checklist;
