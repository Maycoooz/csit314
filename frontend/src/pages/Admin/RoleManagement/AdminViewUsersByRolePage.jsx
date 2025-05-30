// src/pages/ViewUsersByRolePage.jsx
import React from "react";
import Navbar from "../../../components/NavBar";
import ViewUsersByRole from "../../../components/Admin/RoleManagement/ViewUsersByRole";

const ViewUsersByRolePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <ViewUsersByRole />
            </div>
        </div>
    );
};

export default ViewUsersByRolePage;
