import React, { useState } from "react";
import { suspendAccount } from "../services/accountService";
import { useNavigate } from "react-router-dom";
import "../styles/SuspendAccount.css";

const SuspendAccount = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSuspend = async () => {
        try {
            const success = await suspendAccount(username);
            setMessage(success ? "✅ Account suspended successfully." : "❌ Suspension failed.");
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="suspend-account-container">
            <div className="suspend-account-box">
                <h2>Suspend Account</h2>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleSuspend}>Suspend</button>
                {message && <p>{message}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default SuspendAccount;
