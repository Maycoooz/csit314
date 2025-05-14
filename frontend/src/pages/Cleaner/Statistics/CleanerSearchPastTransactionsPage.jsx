import React from "react";
import Navbar from "../../../components/NavBar";
import SearchPastTransactions from "../../../components/Cleaner/Statistics/SearchPastTransactions";

const CleanerSearchPastTransactionsPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <SearchPastTransactions />
            </div>
        </div>
    );
};

export default CleanerSearchPastTransactionsPage;
