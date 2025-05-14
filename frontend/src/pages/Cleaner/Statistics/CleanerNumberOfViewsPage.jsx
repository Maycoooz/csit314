// src/pages/CleanerViewStatsPage.jsx
import React from "react";
import Navbar from "../../../components/NavBar";
import NumberOfViews from "../../../components/Cleaner/Statistics/NumberOfViews";

const CleanerNumberOfViewsPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Your Service View Statistics</h2>
                <NumberOfViews />
            </div>
        </div>
    );
};

export default CleanerNumberOfViewsPage;
