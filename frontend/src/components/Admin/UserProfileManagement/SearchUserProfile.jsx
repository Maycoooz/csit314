import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUserProfile } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/SearchUserProfile.css";

const SearchUserProfile = () => {
    const [role, setRole] = useState("");
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

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
        <div className="search-profile-container">
            <div className="search-profile-box">
                <h2>Search User Profile</h2>
                <form onSubmit={handleSearch} className="search-profile-form">
                    <input
                        type="text"
                        placeholder="Enter role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                    <button type="submit">Search</button>
                </form>
                {message && <p>{message}</p>}
                {results.length > 0 && (
                    <table className="profile-table">
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((profile, index) => (
                                <tr key={index}>
                                    <td>{profile.role}</td>
                                    <td>{profile.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default SearchUserProfile;
