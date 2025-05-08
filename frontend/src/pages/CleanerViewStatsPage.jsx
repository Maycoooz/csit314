// src/pages/CleanerViewStatsPage.jsx
import React from "react";
import Navbar from "../components/NavBar";
import ViewStats from "../components/ViewStats";

const CleanerViewStatsPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Your Service View Statistics</h2>
                <ViewStats />
            </div>
        </div>
    );
};

export default CleanerViewStatsPage;
