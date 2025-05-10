// src/pages/HomeOwnerViewShortlistPage.jsx
import React from "react";
import ShortlistView from "../components/ShortlistView";
import Navbar from "../components/NavBar";

const HomeOwnerViewShortlistPage = () => {

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Find Cleaners</h2>
                <ShortlistView />
            </div>
        </div>
    );
};


export default HomeOwnerViewShortlistPage;
