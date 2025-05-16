import React from "react";
import Navbar from "../../../components/NavBar";
import FilterPastTransactions from "../../../components/HomeOwner/PastTransactions/FilterPastTransactions";

const HomeOwnerFilterPastTransactionsPage = () => {
    return (
        <div>
            <Navbar />
            <FilterPastTransactions />
        </div>
    );
};

export default HomeOwnerFilterPastTransactionsPage;