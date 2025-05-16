// src/pages/CleanerViewStatsPage.jsx
import React from "react";
import Navbar from "../../../components/NavBar";
import NumberOfViews from "../../../components/Cleaner/Statistics/NumberOfViews";

const CleanerNumberOfViewsPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <NumberOfViews />
            </div>
        </div>
    );
};

export default CleanerNumberOfViewsPage;
