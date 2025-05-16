// src/pages/CleanerSearchServicePage.jsx
import React from "react";
import Navbar from "../../../components/NavBar";
import SearchService from "../../../components/Cleaner/ServiceManagement/SearchService";

const CleanerSearchServicePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <SearchService />
            </div>
        </div>
    );
};

export default CleanerSearchServicePage;
