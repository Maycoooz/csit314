import React, { useState } from "react";
import { suspendAccount } from "../services/authService";

const SuspendAccount = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const handleSuspend = async () => {
        try {
            const success = await suspendAccount(username);
            setMessage(success ? "Account suspended successfully." : "Suspension failed.");
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="admin-page">
            <h2>Suspend Account</h2>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSuspend}>Suspend</button>
            <p>{message}</p>
        </div>
    );
};

export default SuspendAccount;
