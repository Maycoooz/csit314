import React, { useState, useEffect } from "react";
import { getRoles, updateUserRole, getAllCurrentUsers } from "../../../services/roleService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/RoleManagement/UpdateUserRole.css";

const UpdateUserRole = () => {
    const [targetUsername, setTargetUsername] = useState("");
    const [updatedRole, setUpdatedRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [showSuccessBox, setShowSuccessBox] = useState(false);
    const navigate = useNavigate();

    // Load roles and users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const rolesData = await getRoles();
                const usersData = await getAllCurrentUsers();
                setRoles(rolesData);
                setUsers(usersData);

            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!targetUsername || !updatedRole) {
            setMessage("❌ Both fields are required.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const success = await updateUserRole({
                target_username: targetUsername,
                updated_role: updatedRole,
            });

            if (success) {
                setTargetUsername("");
                setUpdatedRole("");
                setShowSuccessBox(true);
            } else {
                setMessage("❌ Failed to update user role.");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage("❌ Error occurred while updating role.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <div className="update-role-container">
            <div className="update-role-box">
                <h2>Update User Role</h2>
                <form onSubmit={handleSubmit} className="update-role-form">
                    <label>Select Target Username:</label>
                    <select
                        value={targetUsername}
                        onChange={(e) => setTargetUsername(e.target.value)}
                        required
                    >
                        <option value="">-- Select User --</option>
                        {users.map((user, idx) => (
                            <option key={idx} value={user.username}>
                                {user.username}
                            </option>
                        ))}
                    </select>

                    <label>Select New Role:</label>
                    <select
                        value={updatedRole}
                        onChange={(e) => setUpdatedRole(e.target.value)}
                        required
                    >
                        <option value="">-- Select Role --</option>
                        {roles.map((roleObj, idx) => (
                            <option key={idx} value={roleObj.role}>
                                {roleObj.role} - {roleObj.description}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="yellow-button">Update Role</button>
                    {message && <p className="error-text">{message}</p>}
                </form>
            </div>

            <button className="blue-button back-button" onClick={() => navigate(-1)}>← Back</button>

            {/* Success Modal */}
            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>✅ User Role Updated Successfully</h3>
                        <button onClick={() => setShowSuccessBox(false)} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateUserRole;
