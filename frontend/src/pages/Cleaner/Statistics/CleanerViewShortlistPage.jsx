import React from "react";
import Navbar from "../../../components/NavBar";
import CleanerViewShortlistStats from "../../../components/Cleaner/Statistics/ViewShortlist";

const CleanerViewShortlistPage = () => {

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <CleanerViewShortlistStats />
            </div>
        </div>
    );
};

export default CleanerViewShortlistPage;
