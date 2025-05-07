// src/components/ViewUsersByRole.jsx
import React, { useState, useEffect } from "react";
import { getUsersByRole, getRoles } from "../services/roleService";

const ViewUsersByRole = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getRoles();
                setRoles(rolesData);
            } catch (err) {
                console.error("Failed to load roles", err);
            }
        };

        fetchRoles();
    }, []);

    const handleSearch = async () => {
        try {
            const usersData = await getUsersByRole({ role: selectedRole });
            setUsers(usersData);
            setError("");
        } catch (err) {
            setUsers([]);
            setError("Error fetching users with the specified role.");
        }
    };

    return (
        <div>
            <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
            >
                <option value="">Select a role</option>
                {roles.map((role, index) => (
                    <option key={index} value={role}>
                        {role}
                    </option>
                ))}
            </select>
            <button onClick={handleSearch} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Search
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {users.length > 0 && (
                <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
                    <h3>Users with role: {selectedRole}</h3>
                    <ul>
                        {users.map((user, idx) => (
                            <li key={idx}>
                                <strong>Username:</strong> {user.username} | <strong>Role:</strong> {user.role}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ViewUsersByRole;
