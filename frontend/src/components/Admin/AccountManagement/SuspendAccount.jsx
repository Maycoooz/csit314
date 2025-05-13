import React, { useState, useEffect } from "react";
import { suspendAccount, getAllActiveUsers } from "../../../services/accountService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/AccountManagement/SuspendAccount.css";

const SuspendAccount = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllActiveUsers();
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };
        fetchUsers();
    }, []);

    const handleSuspend = async () => {
        if (!username) {
            setMessage("❌ Please select a user.");
            setTimeout(() => setMessage(""), 2000);
            return;
        }
        try {
            const success = await suspendAccount(username);
            setMessage(success ? "✅ Account suspended successfully." : "❌ Suspension failed.");
            setTimeout(() => setMessage(""), 2000);
            navigate("/Admin/Admin-Dashboard");
        } catch (err) {
            setMessage(err.message || "❌ Unexpected error.");
            setTimeout(() => setMessage(""), 2000);
        }
    };

    return (
        <div className="suspend-account-container">
            <div className="suspend-account-box">
                <h2>Suspend Account</h2>
                <select value={username} onChange={(e) => setUsername(e.target.value)}>
                    <option value="">-- Select a Username --</option>
                        {users.map((user, index) => (
                    <option key={index} value={user.username}>
                        {user.username}
                    </option>
                ))}
                </select>

                <button onClick={handleSuspend}>Suspend</button>
                {message && <p>{message}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default SuspendAccount;
