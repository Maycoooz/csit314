import React, { useState, useEffect } from "react";
import { updateAccount, getAllActiveUsers } from "../../../services/accountService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/AccountManagement/UpdateAccount.css";

const UpdateAccount = () => {
    const [target, setTarget] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
                console.error("❌ Failed to fetch users", err);
            }
        };
        fetchUsers();
    }, []);

    const handleUpdate = async () => {
        if (!target || !newUsername.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            setMessage("❌ All fields are required.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("❌ Passwords do not match.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,12}$/;
        if (!passwordRegex.test(newPassword)) {
            setMessage("❌ Password must include uppercase, lowercase, number, and max 12 characters.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const success = await updateAccount({
                target_username: target,
                updated_username: newUsername,
                updated_password: newPassword
            });

            if (success) {
                // Clear fields immediately
                setTarget("");
                setNewUsername("");
                setNewPassword("");
                setConfirmPassword("");
                setShowSuccessBox(true);
            } else {
                setMessage("❌ Update failed.");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage(err.message || "❌ Unexpected error occurred.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleSuccessBoxClose = () => {
        setShowSuccessBox(false);
        //navigate("/Admin/Admin-Dashboard");
    };

    return (
        <div className="update-account-container">
            <div className="update-account-box">
                <h2>Update Account</h2>

                <select value={target} onChange={(e) => setTarget(e.target.value)}>
                    <option value="">-- Select a Username --</option>
                    {users.map((user, index) => (
                        <option key={index} value={user.username}>
                            {user.username}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleUpdate}>Update</button>
                {message && <p className="error-text">{message}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {/* Success Modal */}
            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>✅ Account Updated Successfully</h3>
                        <button onClick={handleSuccessBoxClose} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateAccount;
