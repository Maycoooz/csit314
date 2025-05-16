import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserProfile } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/CreateUserProfile.css";

const CreateUserProfile = () => {
    const [newRole, setNewRole] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await createUserProfile({
                new_role: newRole,
                new_description: newDescription,
            });

            if (success) {
                setShowModal(true);
                setNewRole("");
                setNewDescription("");
                document.body.classList.add("modal-open");
            } else {
                setError("❌ Creation failed.");
                setTimeout(() => setError(""), 3000);
            }
        } catch (error) {
            setError("❌ " + error.message);
            setTimeout(() => setError(""), 3000);
        }
    };

    const closeModal = () => {
        setNewDescription("");
        setNewRole("");
        setShowModal(false);
        document.body.classList.remove("modal-open");
        //navigate(-1);
    };

    return (
        <div className="create-profile-container">
            <div className="create-profile-box">
                <h2>Create User Profile</h2>
                <form onSubmit={handleSubmit} className="create-profile-form">
                    <label>Role:</label>
                    <input
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        required
                    />

                    <label>Description:</label>
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        rows="4"
                        required
                    />

                    <button type="submit" className="green-button">Create</button>
                </form>

                {error && <p className="error-text">{error}</p>}
            </div>

            <button type="button" onClick={() => navigate(-1)} className="back-button">← Back</button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>✅ User Profile Created!</h2>
                        <p>The user profile has been created successfully.</p>
                        <button className="back-button" onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateUserProfile;
