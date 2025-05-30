import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const AdminAccountManagementPage = () => {
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
                <h2>👤 Account Management</h2>
                <button onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}> ← Back</button>
                <button onClick={() => navigate("/Admin/AccountManagement/CreateAccount")} style={buttonStyle}>➕ Create Account</button>
                <button onClick={() => navigate("/Admin/AccountManagement/ViewAllAccounts")} style={buttonStyle}>📋 View All Accounts</button>
                <button onClick={() => navigate("/Admin/AccountManagement/SearchAccount")} style={buttonStyle}>🔄 Search Account</button>
                <button onClick={() => navigate("/Admin/AccountManagement/SuspendAccount")} style={buttonStyle}>🚫 Suspend Account</button>
                <button onClick={() => navigate("/Admin/AccountManagement/UpdateAccount")} style={buttonStyle}>🔍 Update Account</button>
            </div>
        </div>
    );
};

export default AdminAccountManagementPage;
