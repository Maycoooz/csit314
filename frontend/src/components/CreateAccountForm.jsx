import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { createUserAccount } from "../services/authService"; 
import "./CreateAccountForm.css";

const CreateAccountForm = () => {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // <-- create navigation hook

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

            // Redirect to dashboard after 1 second
            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 1000);

        } catch (err) {
            setMessage(err.message || "Error creating account.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-account-form">
            <h2>Create New Account</h2>
            <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
            />
            <br /><br />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <br /><br />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <br /><br />
            <button type="submit">Create Account</button>
            <p>{message}</p>
        </form>
    );
};

export default CreateAccountForm;
