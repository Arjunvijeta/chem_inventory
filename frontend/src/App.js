import React from "react";
import ChemEditor from "./components/ChemEditor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChemEditor />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
