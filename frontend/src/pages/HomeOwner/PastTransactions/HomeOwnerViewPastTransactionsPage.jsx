import React from "react";
import Navbar from "../../../components/NavBar";
import ViewPastTransactionsHO from "../../../components/HomeOwner/PastTransactions/ViewPastTransactionsHO";

const HomeOwnerViewPastTransactionsPage = () => {
    return (
        <div>
            <Navbar />
            <ViewPastTransactionsHO />
        </div>
    );
};

export default HomeOwnerViewPastTransactionsPage;