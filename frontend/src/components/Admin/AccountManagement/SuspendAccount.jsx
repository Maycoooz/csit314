import React, { useState, useEffect } from "react";
import { suspendAccount, getAllActiveUsers } from "../../../services/accountService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/AccountManagement/SuspendAccount.css";

const SuspendAccount = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [showSuccessBox, setShowSuccessBox] = useState(false);
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
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const success = await suspendAccount(username);
            if (success) {
                setUsername(""); // Clear selection
                setShowSuccessBox(true); // Show modal
            } else {
                setMessage("❌ Suspension failed.");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage(err.message || "❌ Unexpected error.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const closeModal = () => {
        setShowSuccessBox(false);
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
                {message && <p className="error-text">{message}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {/* Success Modal Box */}
            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>✅ Account Suspended Successfully</h3>
                        <button onClick={closeModal} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuspendAccount;
