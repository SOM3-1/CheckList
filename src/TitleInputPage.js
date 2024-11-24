import React, { useState } from "react";
import "./TitleInputPage.css";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const TitleInputPage = ({ onProceed }) => {
  const [title, setTitle] = useState("");
  const [useCaseNames, setUseCaseNames] = useState("");

  const isProceedEnabled = title.trim() && useCaseNames.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isProceedEnabled) {
      onProceed(title, useCaseNames);
    }
  };

  return (
    <div className="title-input-container">
      <h1>Enter Your Checklist Details</h1>
      <form onSubmit={handleSubmit} className="title-input-form">
        <div className="input-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
            placeholder="Enter your title"
          />
        </div>
        <div className="input-group">
          <label htmlFor="useCases">
            Use Case Names (comma-separated):
            <Tooltip title="Add use cases separated by commas (e.g., Create Account, Log in..)">
              <InfoIcon className="tooltip-icon" style={{ color: '#478fff' }} />
            </Tooltip>
          </label>
          <textarea
            id="useCases"
            value={useCaseNames}
            onChange={(e) => setUseCaseNames(e.target.value)}
            className="use-case-input"
            placeholder="e.g., Create Account, Log in,.."
          />
        </div>
        <button
          type="submit"
          className="proceed-button"
          disabled={!isProceedEnabled}
        >
          Proceed
        </button>
      </form>
    </div>
  );
};

export default TitleInputPage;
