import React, { useState } from "react";
import { updateAccount } from "../services/accountService";

const UpdateAccount = () => {
    const [target, setTarget] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdate = async () => {
        try {
            const success = await updateAccount({
                target_username: target,
                updated_username: newUsername,
                updated_password: newPassword
            });
            setMessage(success ? "Account updated successfully." : "Update failed.");
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="admin-page">
            <h2>Update Account</h2>
            <input
                type="text"
                placeholder="Target Username"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            /><br />
            <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
            /><br />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            /><br />
            <button onClick={handleUpdate}>Update</button>
            <p>{message}</p>
        </div>
    );
};

export default UpdateAccount;
