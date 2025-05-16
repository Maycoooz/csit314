import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserAccount } from "../../../services/accountService";
import "../../../styles/Admin/AccountManagement/CreateAccountForm.css";

const CreateAccountForm = () => {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccessBox, setShowSuccessBox] = useState(false);
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

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,12}$/;

        if (!passwordRegex.test(newPassword)) {
            setMessage("❌ Password must contain uppercase, lowercase, number, and max 12 characters.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("❌ Passwords do not match.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const result = await createUserAccount({
                new_username: newUsername,
                new_password: newPassword,
            });

            if (result) {
                // Show success box
                setShowSuccessBox(true);
            }

        } catch (err) {
            setMessage(err.message || "❌ Error creating account.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleSuccessBoxClose = () => {
        // Immediately clear fields
        setNewUsername("");
        setNewPassword("");
        setConfirmPassword("");
        setShowSuccessBox(false);
        //navigate("/Admin/Admin-Dashboard");
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
                {message && <p className="error-text">{message}</p>}
            </form>

            <button onClick={() => navigate(-1)} style={backButtonStyle}>
                ← Back
            </button>

            {/* Success Modal Box */}
            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>✅ Account "{newUsername}" Created Successfully!</h2>
                        <p>The account has been created successfully.</p>
                        <button onClick={handleSuccessBoxClose} className="back-button">
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAccountForm;
