import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<h1>Welcome to C2C Cleaning Platform</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
