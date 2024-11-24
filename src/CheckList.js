import React, { useState, useEffect } from "react";
import ChecklistItem from "./ChecklistItem";
import "./Checklist.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { EditChecklistModal } from "./Modal/EditChecklistModal";
import { SettingsModal } from "./Modal/SettingsModal";
import { AiFillEdit, AiFillDelete, AiOutlineSetting } from "react-icons/ai"

export const CheckList = ({ title, useCases, onDelete, onUpdate }) => {
    const [checkedStates, setCheckedStates] = useState(
        useCases.map(() => false)
    );
    const [strikeThroughEnabled, setStrikeThroughEnabled] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [capitalizeEnabled, setCapitalizeEnabled] = useState(false);
    const [upperCaseEnabled, setUpperCaseEnabled] = useState(false);

    const [editedTitle, setEditedTitle] = useState(title);
    const [editedUseCases, setEditedUseCases] = useState(
        useCases
            .map((uc) => uc.name.trim())
            .filter((name) => name.length > 0)
            .join(", ")
    );

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

    const handleDeleteConfirm = () => {
        localStorage.removeItem("title");
        localStorage.removeItem("useCases");
        localStorage.removeItem("showChecklist");

        onDelete();
        setOpenDelete(false);
    };

    const handleStrikeThroughToggle = (e) => {
        const isEnabled = e.target.checked;
        setStrikeThroughEnabled(isEnabled);
        localStorage.setItem("strikeThroughEnabled", isEnabled);
    };

    const handleCapitalizeToggle = (e) => {
        const isEnabled = e.target.checked;
        if (upperCaseEnabled) setUpperCaseEnabled(false);
        setCapitalizeEnabled(isEnabled);
        localStorage.setItem("capitalizeEnabled", isEnabled);
    };

    const handleUpperCaseToggle = (e) => {
        const isEnabled = e.target.checked;
        if (capitalizeEnabled) setCapitalizeEnabled(false);
        setUpperCaseEnabled(isEnabled);
        localStorage.setItem("upperCaseEnabled", isEnabled);
    };

    const handleSave = () => {
        const updatedUseCases = editedUseCases
            .split(",")
            .map((name) => name.trim())
            .filter((name) => name.length > 0)
            .map((name, index) => ({
                id: `UC${index + 1}`,
                name: name,
            }));


        localStorage.setItem("title", editedTitle);
        localStorage.setItem("useCases", JSON.stringify(updatedUseCases));

        onUpdate(editedTitle, updatedUseCases);
        setOpenEdit(false);
    };

    return (
        <>
            <h1 className="title" style={{ textTransform: capitalizeEnabled ? "uppercase" : upperCaseEnabled ? 'capitalize' : 'none', }}>{title}</h1>
            <div className="checklist">
                {useCases.map((useCase, index) => (
                    <ChecklistItem
                        key={useCase.id}
                        id={useCase.id}
                        label={`${useCase.id}: ${useCase.name}`}
                        checked={checkedStates[index]}
                        onToggle={() => handleToggle(index)}
                        strikeThroughEnabled={strikeThroughEnabled}
                        capitalizeEnabled={capitalizeEnabled}
                        upperCaseEnabled={upperCaseEnabled}
                    />
                ))}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
                <AiFillEdit
                    style={{
                        cursor: "pointer",
                        fontSize: "24px",
                        color: "#1976d2",
                    }}
                    onClick={() => setOpenEdit(true)}
                />
                <AiFillDelete
                    style={{
                        cursor: "pointer",
                        fontSize: "24px",
                        color: "red",
                    }}
                    onClick={() => setOpenDelete(true)}
                />
                <AiOutlineSetting
                    style={{
                        cursor: "pointer",
                        fontSize: "24px",
                        color: "grey",
                    }}
                    onClick={() => setOpenSettings(true)}
                />
            </div>

            {/* Edit Modal */}
            <EditChecklistModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                title={editedTitle}
                setTitle={setEditedTitle}
                useCases={editedUseCases}
                setUseCases={setEditedUseCases}
                onSave={handleSave}
            />
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

            <SettingsModal
                open={openSettings}
                onClose={() => setOpenSettings(false)}
                strikeThroughEnabled={strikeThroughEnabled}
                onStrikeThroughToggle={handleStrikeThroughToggle}
                capitalizeEnabled={capitalizeEnabled}
                onCapitalizeToggle={handleCapitalizeToggle}
                upperCaseEnabled={upperCaseEnabled}
                onUpperCaseToggle={handleUpperCaseToggle}
            />

        </>
    );
};

