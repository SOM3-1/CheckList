import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./EditChecklistModal.css";

export const EditChecklistModal = ({
  open,
  onClose,
  title,
  setTitle,
  useCases,
  setUseCases,
  onSave,
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
        <h2>Edit Checklist</h2>
        <div className="input-group">
          <label htmlFor="edit-title">Title:</label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />
        </div>
        <div className="input-group" style={{ marginTop: "15px" }}>
          <label htmlFor="edit-use-cases">Use Case Names (comma-separated):</label>
          <textarea
            id="edit-use-cases"
            value={useCases}
            onChange={(e) => setUseCases(e.target.value)}
            className="use-case-input"
            style={{ width: "100%", height: "100px" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            style={{ backgroundColor: "#1976d2" }}
          >
            Update
          </Button>
          <Button variant="outlined" onClick={onClose} style={{ color: "white", backgroundColor:'grey' }}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

