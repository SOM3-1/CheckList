import React from "react";
import "./App.css"; // Add global styles if necessary
import Checklist from "./CheckList";

const App = () => {
  return (
    <div>
      <h1  style={{display:'flex', alignSelf:'center', justifyContent:'center'}}>Study Nest Use Case Checklist</h1>
      <Checklist/>
    </div>
  );
};

export default App;
