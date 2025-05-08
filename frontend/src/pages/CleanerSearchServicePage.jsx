// src/pages/CleanerSearchServicePage.jsx
import React from "react";
import Navbar from "../components/NavBar";
import SearchService from "../components/SearchService";

const CleanerSearchServicePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Search Your Services</h2>
                <SearchService />
            </div>
        </div>
    );
};

export default CleanerSearchServicePage;
