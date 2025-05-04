import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUserProfile } from "../services/userProfileService";

const SearchUserProfile = () => {
    const [role, setRole] = useState("");
    const [results, setResults] = useState([]);
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

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const data = await searchUserProfile(role);
            setResults(data);
            setMessage(data.length ? "" : "No profiles found.");
        } catch (err) {
            setMessage("Error: " + err.message);
            setResults([]);
        }
    };

    return (
        <div style={{ paddingTop: "70px", textAlign: "center" }}>
            <h2>Search User Profile</h2>
            <form onSubmit={handleSearch} style={{ display: "inline-block", textAlign: "left" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Role:</label><br />
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        style={{ width: "300px", padding: "8px" }}
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <button type="submit" style={buttonStyle}>Search</button>
                    <button type="button" onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}>← Back</button>
                </div>
            </form>

            {message && <p>{message}</p>}

            {results.length > 0 && (
                <table style={{ margin: "20px auto", borderCollapse: "collapse", width: "80%" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Role</th>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((profile, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{profile.role}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{profile.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SearchUserProfile;
