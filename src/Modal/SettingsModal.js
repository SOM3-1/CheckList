import "./SettingsModal.css";

import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

export const SettingsModal = ({
  open,
  onClose,
  strikeThroughEnabled,
  onStrikeThroughToggle,
  capitalizeEnabled,
  onCapitalizeToggle,
  upperCaseEnabled,
  onUpperCaseToggle,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <h2>Settings</h2>
        <div className="settings-option">
          <label>Enable Strikethrough:</label>
          <Switch
            checked={strikeThroughEnabled}
            onChange={onStrikeThroughToggle}
          />
        </div>
        <div className="settings-option">
          <label>Capitalize All Content:</label>
          <Switch
            checked={capitalizeEnabled}
            onChange={onCapitalizeToggle}
          />
        </div>
        <div className="settings-option">
          <label>Uppercase All Content:</label>
          <Switch
            checked={upperCaseEnabled}
            onChange={onUpperCaseToggle}
          />
        </div>
        <Button
          variant="contained"
          onClick={onClose}
          style={{ marginTop: "20px", float: "right", color: "white", backgroundColor:'grey' }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};
