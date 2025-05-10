// src/pages/HomeOwnerViewCleanersPage.jsx
import React from "react";
import FindCleaners from "../components/ViewCleaners";
import Navbar from "../components/NavBar";

const HomeOwnerViewCleanersPage = () => {

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Find Cleaners</h2>
                <FindCleaners />
            </div>
        </div>
    );
};


export default HomeOwnerViewCleanersPage;
