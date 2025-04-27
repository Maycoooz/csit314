import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const AdminDashboardPage = () => {
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        navigate("/create-account");
    };

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h1>Welcome to Admin Dashboard</h1>
                <button
                    onClick={handleCreateAccount}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        borderRadius: "5px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none"
                    }}
                >
                    Create Account
                </button>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
