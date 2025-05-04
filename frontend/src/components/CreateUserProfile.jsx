import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserProfile } from "../services/userProfileService";

const CreateUserProfile = () => {
    const [newRole, setNewRole] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const buttonStyle = {
        margin: "10px",
        padding: "12px 25px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await createUserProfile({
                new_role: newRole,
                new_description: newDescription
            });
            setMessage(success ? "User profile created successfully!" : "Creation failed.");
            setNewRole("");
            setNewDescription("");
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div style={{ paddingTop: "70px", textAlign: "center" }}>
            <h2>Create User Profile</h2>
            <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Role:</label><br />
                    <input
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        required
                        style={{ width: "300px", padding: "8px" }}
                    /> 
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Description:</label><br />
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        required
                        rows="4"
                        style={{ width: "300px", padding: "8px" }}
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <button type="submit" style={buttonStyle}>Create</button>
                    <button type="button" onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}>← Back</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateUserProfile;
