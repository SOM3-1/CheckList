import React, { useState, useEffect } from "react";
import "./App.css";
import TitleInputPage from "./TitleInputPage";
import {CheckList} from './CheckList'

const App = () => {
    const [showChecklist, setShowChecklist] = useState(false);
    const [useCases, setUseCases] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const savedTitle = localStorage.getItem("title");
        const savedUseCases = JSON.parse(localStorage.getItem("useCases"));
        const savedShowChecklist = JSON.parse(localStorage.getItem("showChecklist"));

        if (savedTitle && savedUseCases) {
            setTitle(savedTitle);
            setUseCases(savedUseCases);
            setShowChecklist(savedShowChecklist);
        }
    }, []);

    const handleProceed = (title, useCaseNames) => {
      const useCaseArray = useCaseNames
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0)
      .map((name, index) => ({
        id: `UC${index + 1}`,
        name: name,
      }));

        setUseCases(useCaseArray);
        setTitle(title);
        setShowChecklist(true);

        localStorage.setItem("title", title);
        localStorage.setItem("useCases", JSON.stringify(useCaseArray));
        localStorage.setItem("showChecklist", true);
    };

    const handleDelete = () => {
        setTitle("");
        setUseCases([]);
        setShowChecklist(false);
    };

    const handleUpdate = (updatedTitle, updatedUseCases) => {
        setTitle(updatedTitle);
        setUseCases(updatedUseCases);
    };

    return (
        <div>
            {showChecklist ? (
                <CheckList
                    title={title}
                    useCases={useCases}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            ) : (
                <TitleInputPage onProceed={handleProceed} />
            )}
        </div>
    );
};

export default App;
