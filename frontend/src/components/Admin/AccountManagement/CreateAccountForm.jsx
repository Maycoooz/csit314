import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { createUserAccount } from "../../../services/accountService";
import "../../../styles/Admin/AccountManagement/CreateAccountForm.css";

const CreateAccountForm = () => {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
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

    const backButtonStyle = {
        ...buttonStyle,
        backgroundColor: "rgb(65, 129, 172)"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const result = await createUserAccount({
                new_username: newUsername,
                new_password: newPassword,
            });

            setMessage(result.message || "Account created successfully.");

            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 1000);

        } catch (err) {
            setMessage(err.message || "Error creating account.");
        }
    };

    return (
        <div className="create-account-container">
            <form onSubmit={handleSubmit} className="create-account-form">
                <h2>Create New Account</h2>
                <input
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Create Account</button>
                <p>{message}</p>
            </form>
            
            <button onClick={() => navigate(-1)} style={backButtonStyle}>
                ← Back
            </button>


        </div>
        
    );
    
};

export default CreateAccountForm;
