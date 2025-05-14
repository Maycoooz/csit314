import React from "react";
import Navbar from "../../../components/NavBar";
import ViewPastTransactions from "../../../components/Cleaner/Statistics/ViewPastTransactions";

const CleanerViewPastTransactionsPage = () => {
    return (
        <div>
            <Navbar />
            <div className="page-container">
                <ViewPastTransactions />
            </div>
        </div>
    );
};

export default CleanerViewPastTransactionsPage;
