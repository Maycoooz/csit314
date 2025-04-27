import React, { useState } from "react";
import { createUserAccount } from "../services/authService"; 
import "./CreateAccountForm.css";

const CreateAccountForm = () => {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await createUserAccount({
                new_username: newUsername,
                new_password: newPassword,
            });

            setMessage(result.message);
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ paddingTop: "70px", textAlign: "center" }}>
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
            <button type="submit">Create Account</button>
            <p>{message}</p>
        </form>
    );
};

export default CreateAccountForm;
