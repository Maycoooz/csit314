import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/UpdateUserProfile.css";

const UpdateUserProfile = () => {
    const [targetRole, setTargetRole] = useState("");
    const [updatedRole, setUpdatedRole] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const success = await updateUserProfile({
                target_role: targetRole,
                updated_role: updatedRole,
                updated_description: updatedDescription
            });

            setMessage(success ? "✅ Profile updated successfully!" : "❌ Failed to update profile.");
            setTargetRole("");
            setUpdatedRole("");
            setUpdatedDescription("");
        } catch (err) {
            setMessage("Error: " + err.message);
        }
    };

    return (
        <div className="update-profile-container">
            <div className="update-profile-box">
                <h2>Update User Profile</h2>
                <form onSubmit={handleUpdate} className="update-profile-form">
                    <label>Current Role:</label>
                    <input
                        type="text"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        required
                    />
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
                {message && <p>{message}</p>}
            </div>
            <button className="blue-button back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default UpdateUserProfile;
