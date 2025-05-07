import React, { useState, useEffect } from "react";
import { getRoles, updateUserRole } from "../services/roleService";

const UpdateUserRole = () => {
    const [targetUsername, setTargetUsername] = useState("");
    const [updatedRole, setUpdatedRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                console.log("Roles fetched from backend:", data);
                setRoles(data);
                if (data.length > 0) {
                    setUpdatedRole(data[0].role); // default
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
            setMessage(success ? "User role updated successfully." : "Failed to update user role.");
        } catch (err) {
            setMessage("Error occurred while updating role.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "inline-block", marginTop: "20px" }}>
            <div>
                <input
                    type="text"
                    placeholder="Target Username"
                    value={targetUsername}
                    onChange={(e) => setTargetUsername(e.target.value)}
                    required
                    style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
                />
            </div>
            <div>
            <select
                value={updatedRole}
                onChange={(e) => setUpdatedRole(e.target.value)}
                required
                style={{ margin: "10px", padding: "10px", fontSize: "16px" }}>
                    
                <option value="">Select Role</option>
                    {roles.map((roleObj, idx) => (
                    <option key={idx} value={roleObj.role}>
                        {roleObj.role} - {roleObj.description}
                    </option>
                ))}
            </select>

            </div>
            <button type="submit" style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>
                Update Role
            </button>
            {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
        </form>
    );
};

export default UpdateUserRole;
