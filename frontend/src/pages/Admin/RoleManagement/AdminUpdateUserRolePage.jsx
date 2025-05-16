import React from "react";
import Navbar from "../../../components/NavBar";
import UpdateUserRole from "../../../components/Admin/RoleManagement/UpdateUserRole";

const AdminRMUpdateUserRolePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <UpdateUserRole />
            </div>
        </div>
    );
};

export default AdminRMUpdateUserRolePage;
