import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { suspendUserProfile, viewAllUserProfiles } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/SuspendUserProfile.css";

const SuspendUserProfile = () => {
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await viewAllUserProfiles();
                setRoles(data.filter(r => r.status === "active")); // only show active roles
            } catch (err) {
                console.error("❌ Failed to fetch roles", err);
            }
        };
        fetchRoles();
    }, []);

    const handleSuspend = async () => {
        if (!role) {
            setMessage("❌ Please select a role.");
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        try {
            const success = await suspendUserProfile(role);
            setMessage(success
                ? `✅ Users under "${role}" have been suspended.`
                : `ℹ️ Role "${role}" suspended, but no users were affected.`);
            setTimeout(() => {
                setMessage("");
                navigate("/Admin/UserProfileManagement");
            }, 2000);
        } catch (err) {
            setMessage("❌ " + err.message);
            setTimeout(() => setMessage(""), 2000);
        }
    };

    return (
        <div className="suspend-profile-container">
            <div className="suspend-profile-box">
                <h2>Suspend User Profile</h2>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">-- Select a Role --</option>
                    {roles.map((r, index) => (
                    <option key={index} value={r.role}>{r.role}</option>
                    ))}
                </select>
                <button onClick={handleSuspend}>Suspend</button>
                {message && <p>{message}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default SuspendUserProfile;
