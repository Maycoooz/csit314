import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const AdminRoleManagementPage = () => {
    const navigate = useNavigate();

    const buttonStyle = {
        margin: "10px",
        padding: "12px 25px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer"
    };

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Role Management</h2>
                <button onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}> ← Back</button>
                <button onClick={() => navigate("/Admin/RoleManagement/UpdateUserRole")} style={buttonStyle}>Update User Role</button>
                <button onClick={() => navigate("/Admin/RoleManagement/ViewUsersByRole")} style={buttonStyle}>View Users by Role</button>
            </div>
        </div>
    );
};

export default AdminRoleManagementPage;
