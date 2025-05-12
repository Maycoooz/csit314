import React, { useState, useEffect } from "react";
import { updateAccount, getAllActiveUsers } from "../../../services/accountService"; // import the new function
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/AccountManagement/UpdateAccount.css";

const UpdateAccount = () => {
    const [target, setTarget] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllActiveUsers(); // your GET /admin/allUsers
                setUsers(data);
            } catch (err) {
                console.error("❌ Failed to fetch users", err);
            }
        };
        fetchUsers();
    }, []);

    const handleUpdate = async () => {
        try {
            const success = await updateAccount({
                target_username: target,
                updated_username: newUsername,
                updated_password: newPassword
            });
            setMessage(success ? "✅ Account updated successfully." : "❌ Update failed.");
        } catch (err) {
            setMessage(err.message);
        }
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
                <button onClick={handleUpdate}>Update</button>
                {message && <p>{message}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default UpdateAccount;
