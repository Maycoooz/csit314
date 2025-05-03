import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const AccountManagementPage = () => {
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
                <h2>Account Management</h2>
                <button onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}> ← Back</button>
                <button onClick={() => navigate("/admin-am-create-account")} style={buttonStyle}>Create Account</button>
                <button onClick={() => navigate("/admin-am-view-accounts")} style={buttonStyle}>View All Accounts</button>
                <button onClick={() => navigate("/admin-am-search-accounts")} style={buttonStyle}>Search Account</button>
                <button onClick={() => navigate("/admin-am-suspend-account")} style={buttonStyle}>Suspend Account</button>
                <button onClick={() => navigate("/admin-am-update-account")} style={buttonStyle}>Update Account</button>
            </div>
        </div>
    );
};

export default AccountManagementPage;
