import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { suspendUserProfile } from "../services/userProfileService";

const SuspendUserProfile = () => {
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const buttonStyle = {
        margin: "10px",
        padding: "12px 25px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "#dc3545", // red for destructive action
        color: "white",
        border: "none",
        cursor: "pointer"
    };

    const handleSuspend = async (e) => {
        e.preventDefault();
        try {
            const success = await suspendUserProfile(role);
            setMessage(success ? `Role "${role}" suspended successfully.` : `Failed to suspend role "${role}".`);
            setRole("");
        } catch (err) {
            setMessage("Error: " + err.message);
        }
    };

    return (
        <div style={{ paddingTop: "70px", textAlign: "center" }}>
            <h2>Suspend User Profile</h2>
            <form onSubmit={handleSuspend} style={{ display: "inline-block", textAlign: "left" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Role to suspend:</label><br />
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        style={{ width: "300px", padding: "8px" }}
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <button type="submit" style={buttonStyle}>Suspend</button>
                    <button type="button" onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}>← Back</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SuspendUserProfile;
