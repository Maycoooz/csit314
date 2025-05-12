import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { suspendUserProfile } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/SuspendUserProfile.css";

const SuspendUserProfile = () => {
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSuspend = async () => {
        try {
            const success = await suspendUserProfile(role);
            setMessage(success ? `✅ Role "${role}" suspended successfully.` : `❌ Suspension failed.`);
        } catch (err) {
            setMessage("Error: " + err.message);
        }
    };

    return (
        <div className="suspend-profile-container">
            <div className="suspend-profile-box">
                <h2>Suspend User Profile</h2>
                <input
                    type="text"
                    placeholder="Enter role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <button onClick={handleSuspend}>Suspend</button>
                {message && <p>{message}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default SuspendUserProfile;
