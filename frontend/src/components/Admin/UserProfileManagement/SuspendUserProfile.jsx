import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { suspendUserProfile, viewAllUserProfiles } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/SuspendUserProfile.css";

const SuspendUserProfile = () => {
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await viewAllUserProfiles();
                setRoles(data.filter(r => r.status === "active"));
            } catch (err) {
                console.error("❌ Failed to fetch roles", err);
            }
        };
        fetchRoles();
    }, []);

    const handleSuspend = async () => {
        if (!role) {
            setError("❌ Please select a role.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        try {
            const success = await suspendUserProfile(role);
            const msg = success
                ? `✅ Users under "${role}" have been suspended.`
                : `ℹ️ Role "${role}" has already been suspended or no users were affected.`;

            setModalMessage(msg);
            setShowModal(true);
            document.body.classList.add("modal-open");
        } catch (err) {
            setError("❌ " + err.message);
            setTimeout(() => setError(""), 3000);
        }
    };

    const closeModal = () => {
        setRole("");
        setShowModal(false);
        document.body.classList.remove("modal-open");
        //navigate("/Admin/UserProfileManagement");
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
                {error && <p className="error-text">{error}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>{modalMessage}</h2>
                        <button className="back-button" onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuspendUserProfile;
