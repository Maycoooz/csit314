import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile, viewAllUserProfiles } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/UpdateUserProfile.css";

const UpdateUserProfile = () => {
    const [targetRole, setTargetRole] = useState("");
    const [updatedRole, setUpdatedRole] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [message, setMessage] = useState("");
    const [roles, setRoles] = useState([]);
    const [showSuccessBox, setShowSuccessBox] = useState(false);
    const navigate = useNavigate();

    // Fetch existing roles for dropdown
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await viewAllUserProfiles();
                setRoles(data);
            } catch (err) {
                console.error("❌ Failed to fetch roles", err);
            }
        };
        fetchRoles();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!targetRole || !updatedRole || !updatedDescription) {
            setMessage("❌ All fields are required.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const success = await updateUserProfile({
                target_role: targetRole,
                updated_role: updatedRole,
                updated_description: updatedDescription
            });

            if (success) {
                setTargetRole("");
                setUpdatedRole("");
                setUpdatedDescription("");
                setShowSuccessBox(true);
            } else {
                setMessage("❌ Failed to update profile.");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage("❌ " + err.message);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleSuccessBoxClose = () => {
        setShowSuccessBox(false);
        navigate("/Admin/Admin-Dashboard");
    };

    return (
        <div className="update-profile-container">
            <div className="update-profile-box">
                <h2>Update User Profile</h2>
                <form onSubmit={handleUpdate} className="update-profile-form">
                    <label>Current Role:</label>
                    <select
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        required
                    >
                        <option value="">-- Select a Role --</option>
                        {roles.map((profile, index) => (
                            <option key={index} value={profile.role}>
                                {profile.role}
                            </option>
                        ))}
                    </select>

                    <label>New Role:</label>
                    <input
                        type="text"
                        value={updatedRole}
                        onChange={(e) => setUpdatedRole(e.target.value)}
                        required
                    />

                    <label>New Description:</label>
                    <textarea
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        rows="4"
                        required
                    />

                    <button type="submit" className="yellow-button">Update</button>
                </form>
                {message && <p className="error-text">{message}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>✅ Profile Updated Successfully</h3>
                        <button onClick={handleSuccessBoxClose} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateUserProfile;
