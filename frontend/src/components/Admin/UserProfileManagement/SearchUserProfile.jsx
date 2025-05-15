import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUserProfile } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/SearchUserProfile.css";

const SearchUserProfile = () => {
    const [role, setRole] = useState("");
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        const trimmedRole = role.trim();

        if (!trimmedRole) {
            setMessage("❌ Please enter a role to search.");
            setResults([]);
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const data = await searchUserProfile(trimmedRole);
            if (data.length === 0) {
                setMessage("❌ No profiles found.");
                setShowModal(false);
                setResults([]);
                setTimeout(() => setMessage(""), 3000);
            } else {
                setResults(data);
                setMessage("");
                setShowModal(true);
                document.body.classList.add("modal-open");
            }
        } catch (err) {
            setMessage("❌ " + (err.message || "Search failed."));
            setResults([]);
            setShowModal(false);
            setTimeout(() => setMessage(""), 3000);
        }

        setRole(""); // Clear input after search
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
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
                {message && <p className="error-text">{message}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Search Results</h3>
                        <table className="profile-table">
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((profile, index) => (
                                    <tr key={index}>
                                        <td>{profile.role}</td>
                                        <td>{profile.description}</td>
                                        <td>{profile.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <button onClick={closeModal} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchUserProfile;
