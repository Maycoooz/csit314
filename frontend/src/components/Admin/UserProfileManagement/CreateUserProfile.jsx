import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserProfile } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/CreateUserProfile.css";

const CreateUserProfile = () => {
    const [newRole, setNewRole] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await createUserProfile({
                new_role: newRole,
                new_description: newDescription
            });
            setMessage(success ? "✅ User profile created successfully!" : "❌ Creation failed.");
            setNewRole("");
            setNewDescription("");
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div className="create-profile-container">
            <div className="create-profile-box">
                <h2>Create User Profile</h2>
                <form onSubmit={handleSubmit} className="create-profile-form">
                    <div>
                        <label>Role:</label>
                        <input
                            type="text"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            required
                            rows="4"
                        />
                    </div>
                    
                    <button type="submit" className="green-button">Create</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            <button type="button" onClick={() => navigate(-1)} className="back-button">← Back</button>
        </div>
    );
};

export default CreateUserProfile;
