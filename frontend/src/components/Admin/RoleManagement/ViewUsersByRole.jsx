import React, { useState, useEffect } from "react";
import { getUsersByRole, getRoles } from "../../../services/roleService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/RoleManagement/ViewUsersByRole.css";

const ViewUsersByRole = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
            setError("❌ Error fetching users with the specified role.");
        }
    };

    return (
        <div className="view-users-role-container">
            <div className="view-users-role-box">
                <h2>View Users by Role</h2>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    required
                >
                    <option value="">Select a role</option>
                    {roles.map((r, index) => (
                        <option key={index} value={r.role}>
                        {r.role}
                    </option>
))}
                </select>
                <button onClick={handleSearch} className="green-button">Search</button>

                {error && <p className="error-text">{error}</p>}

                {users.length > 0 && (
                    <div className="user-results">
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

            <button className="blue-button back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewUsersByRole;
