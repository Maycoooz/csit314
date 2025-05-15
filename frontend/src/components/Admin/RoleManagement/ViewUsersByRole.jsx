import React, { useState, useEffect } from "react";
import { getUsersByRole, getRoles } from "../../../services/roleService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/RoleManagement/ViewUsersByRole.css";

const ViewUsersByRole = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
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
        if (!selectedRole) {
            setError("❌ Please select a role.");
            setUsers([]);
            setShowModal(false);
            setTimeout(() => setError(""), 3000);
            return;
        }

        try {
            const usersData = await getUsersByRole({ role: selectedRole });
            setUsers(usersData);
            setError("");
            setShowModal(true);
            document.body.classList.add("modal-open");
            setSelectedRole("");
        } catch (err) {
            setUsers([]);
            setShowModal(false);
            setError("❌ Error fetching users with the specified role.");
            setTimeout(() => setError(""), 3000);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
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
                    <option value="">-- Select Role --</option>
                    {roles.map((r, index) => (
                        <option key={index} value={r.role}>
                            {r.role}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearch} className="green-button">Search</button>

                {error && <p className="error-text">{error}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Users with role: {selectedRole}</h3>
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr key={idx}>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                        <td>{user.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <button onClick={closeModal} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewUsersByRole;
