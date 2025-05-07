import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../services/userProfileService";

const UpdateUserProfile = () => {
    const [targetRole, setTargetRole] = useState("");
    const [updatedRole, setUpdatedRole] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const buttonStyle = {
        margin: "10px",
        padding: "12px 25px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "#ffc107", // yellow for update/edit
        color: "black",
        border: "none",
        cursor: "pointer"
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const success = await updateUserProfile({
                target_role: targetRole,
                updated_role: updatedRole,
                updated_description: updatedDescription
            });

            setMessage(success ? "Profile updated successfully!" : "Failed to update profile.");
            setTargetRole("");
            setUpdatedRole("");
            setUpdatedDescription("");
        } catch (err) {
            setMessage("Error: " + err.message);
        }
    };

    return (
        <div style={{ paddingTop: "70px", textAlign: "center" }}>
            <h2>Update User Profile</h2>
            <form onSubmit={handleUpdate} style={{ display: "inline-block", textAlign: "left" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Current Role:</label><br />
                    <input
                        type="text"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        required
                        style={{ width: "300px", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>New Role:</label><br />
                    <input
                        type="text"
                        value={updatedRole}
                        onChange={(e) => setUpdatedRole(e.target.value)}
                        required
                        style={{ width: "300px", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>New Description:</label><br />
                    <textarea
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        rows="4"
                        required
                        style={{ width: "300px", padding: "8px" }}
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <button type="submit" style={buttonStyle}>Update</button>
                    <button type="button" onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)", color: "white" }}>← Back</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateUserProfile;
