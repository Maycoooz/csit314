// src/pages/ViewUsersByRolePage.jsx
import React from "react";
import Navbar from "../../../components/NavBar";
import ViewUsersByRole from "../../../components/Admin/RoleManagement/ViewUsersByRole";

const ViewUsersByRolePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>View Users by Role</h2>
                <ViewUsersByRole />
            </div>
        </div>
    );
};

export default ViewUsersByRolePage;
