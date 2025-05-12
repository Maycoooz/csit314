import React, { useState, useEffect } from "react";
import { getRoles, updateUserRole } from "../../../services/roleService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/RoleManagement/UpdateUserRole.css";

const UpdateUserRole = () => {
    const [targetUsername, setTargetUsername] = useState("");
    const [updatedRole, setUpdatedRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                setRoles(data);
                if (data.length > 0) {
                    setUpdatedRole(data[0].role);
                }
            } catch (error) {
                console.error("Failed to fetch roles:", error);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await updateUserRole({
                target_username: targetUsername,
                updated_role: updatedRole,
            });
            setMessage(success ? "✅ User role updated successfully." : "❌ Failed to update user role.");
        } catch (err) {
            setMessage("Error occurred while updating role.");
        }
    };

    return (
        <div className="update-role-container">
            <div className="update-role-box">
                <h2>Update User Role</h2>
                <form onSubmit={handleSubmit} className="update-role-form">
                    <label>Target Username:</label>
                    <input
                        type="text"
                        value={targetUsername}
                        onChange={(e) => setTargetUsername(e.target.value)}
                        required
                    />

                    <label>Select New Role:</label>
                    <select
                        value={updatedRole}
                        onChange={(e) => setUpdatedRole(e.target.value)}
                        required
                    >
                        <option value="">Select Role</option>
                        {roles.map((roleObj, idx) => (
                            <option key={idx} value={roleObj.role}>
                                {roleObj.role} - {roleObj.description}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="yellow-button">Update Role</button>
                    {message && <p>{message}</p>}
                </form>
            </div>

            <button className="blue-button back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default UpdateUserRole;
