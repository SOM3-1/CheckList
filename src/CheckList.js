import React, { useState, useEffect } from "react";
import ChecklistItem from "./ChecklistItem";
import "./Checklist.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

const Checklist = ({ title, useCases, onDelete, onUpdate }) => {
  const [checkedStates, setCheckedStates] = useState(
    useCases.map(() => false)
  );
  const [strikeThroughEnabled, setStrikeThroughEnabled] = useState(false); // Strike-through toggle

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSettings, setOpenSettings] = useState(false); // Settings modal

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedUseCases, setEditedUseCases] = useState(
    useCases.map((uc) => uc.name).join(", ")
  );

  // Load initial strikethrough setting from localStorage
  useEffect(() => {
    const savedStrikeThrough = localStorage.getItem("strikeThroughEnabled");
    if (savedStrikeThrough !== null) {
      setStrikeThroughEnabled(JSON.parse(savedStrikeThrough));
    }
  }, []);

  const handleToggle = (index) => {
    const updatedStates = [...checkedStates];
    updatedStates[index] = !updatedStates[index];
    setCheckedStates(updatedStates);
  };

  const handleUpdate = () => {
    const updatedUseCases = editedUseCases.split(",").map((name, index) => ({
      id: `UC${index + 1}`,
      name: name.trim(),
    }));

    localStorage.setItem("title", editedTitle);
    localStorage.setItem("useCases", JSON.stringify(updatedUseCases));

    onUpdate(editedTitle, updatedUseCases);
    setOpenEdit(false); // Close modal
  };

  const handleDeleteConfirm = () => {
    localStorage.removeItem("title");
    localStorage.removeItem("useCases");
    localStorage.removeItem("showChecklist");

    onDelete();
    setOpenDelete(false); // Close dialog
  };

  const handleSettingsUpdate = (e) => {
    const isEnabled = e.target.checked;
    setStrikeThroughEnabled(isEnabled);
    localStorage.setItem("strikeThroughEnabled", isEnabled); // Save setting in localStorage
  };

  return (
    <>
      <h1 className="title">{title}</h1>
      <div className="checklist">
        {useCases.map((useCase, index) => (
          <ChecklistItem
            key={useCase.id}
            id={useCase.id}
            label={`${useCase.id}: ${useCase.name}`}
            checked={checkedStates[index]}
            onToggle={() => handleToggle(index)}
            strikeThroughEnabled={strikeThroughEnabled}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <Tooltip title="Edit Checklist">
          <EditIcon
            style={{ cursor: "pointer", marginRight: "20px", color: "#1976d2" }}
            onClick={() => setOpenEdit(true)}
          />
        </Tooltip>
        <Tooltip title="Delete Checklist">
          <DeleteIcon
            style={{ cursor: "pointer", marginRight: "20px", color: "red" }}
            onClick={() => setOpenDelete(true)}
          />
        </Tooltip>
        <Tooltip title="Settings">
          <SettingsIcon
            style={{ cursor: "pointer", color: 'grey' }}
            onClick={() => setOpenSettings(true)}
          />
        </Tooltip>
      </div>

      {/* Edit Modal */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
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
          <h2>Edit Checklist</h2>
          <div className="input-group">
            <label htmlFor="edit-title">Title:</label>
            <input
              type="text"
              id="edit-title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="title-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="edit-use-cases">Use Case Names (comma-separated):</label>
            <textarea
              id="edit-use-cases"
              value={editedUseCases}
              onChange={(e) => setEditedUseCases(e.target.value)}
              className="use-case-input"
            />
          </div>
          <Button
            variant="contained"
            onClick={() => setOpenEdit(false)}
            style={{ marginTop: "20px", float: "left", color: "grey" }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            style={{ marginTop: "20px", float: "right" }}
          >
            Update
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            borderRadius: "8px",
          }}
        >
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete this checklist?</p>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            style={{ marginRight: "10px" }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenDelete(false)}
          >
            No
          </Button>
        </Box>
      </Modal>

      {/* Settings Modal */}
      <Modal open={openSettings} onClose={() => setOpenSettings(false)}>
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
              onChange={handleSettingsUpdate}
            />
          </div>
          <Button
            variant="contained"
            onClick={() => setOpenSettings(false)}
            style={{ marginTop: "20px", float: "right" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Checklist;
