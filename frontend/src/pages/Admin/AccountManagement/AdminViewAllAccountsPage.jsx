import React from "react";
import ViewAccounts from "../../../components/Admin/AccountManagement/ViewAllAccounts";
import Navbar from "../../../components/NavBar";

const AdminViewAllAccountsPage = () => {
    return (
        <div>
            <Navbar />
            <ViewAccounts />
        </div>
    );
};

export default AdminViewAllAccountsPage;
