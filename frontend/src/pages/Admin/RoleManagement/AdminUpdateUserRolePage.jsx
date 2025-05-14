import React from "react";
import Navbar from "../../../components/NavBar";
import UpdateUserRole from "../../../components/Admin/RoleManagement/UpdateUserRole";

const AdminRMUpdateUserRolePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Update User Role</h2>
                <UpdateUserRole />
            </div>
        </div>
    );
};

export default AdminRMUpdateUserRolePage;
