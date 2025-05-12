import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const AdminUserProfileManagementPage = () => {
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
                <h2>User Profile Management</h2>
                <button onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}> ← Back</button>
                <button onClick={() => navigate("/admin-upm-create-userprofile")} style={buttonStyle}>Create User Profile</button>
                <button onClick={() => navigate("/admin-upm-view-userprofiles")} style={buttonStyle}>View All User Profiles</button>
                <button onClick={() => navigate("/admin-upm-search-userprofile")} style={buttonStyle}>Search User Profile</button>
                <button onClick={() => navigate("/admin-upm-suspend-userprofile")} style={buttonStyle}>Suspend User Profile</button>
                <button onClick={() => navigate("/admin-upm-update-userprofile")} style={buttonStyle}>Update User Profile</button>
            </div>
        </div>
    );
};

export default AdminUserProfileManagementPage;
