// src/pages/HomeOwnerViewCleanersPage.jsx
import React from "react";
import ViewCleaners from "../components/ViewCleaners";
import Navbar from "../components/NavBar";

const HomeOwnerViewCleanersPage = () => {

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Find & View Cleaners</h2>
                <ViewCleaners />
            </div>
        </div>
    );
};


export default HomeOwnerViewCleanersPage;
