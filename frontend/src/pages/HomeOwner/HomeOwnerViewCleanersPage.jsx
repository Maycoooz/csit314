// src/pages/HomeOwnerViewCleanersPage.jsx
import React from "react";
import ViewCleaners from "../../components/HomeOwner/ViewCleaners";
import Navbar from "../../components/NavBar";

const HomeOwnerViewCleanersPage = () => {

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <ViewCleaners />
            </div>
        </div>
    );
};


export default HomeOwnerViewCleanersPage;
