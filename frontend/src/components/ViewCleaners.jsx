import React, { useState } from "react";
import { viewCleaners } from "../services/homeOwnerService";
import { useNavigate } from "react-router-dom";
import "../styles/ViewCleaners.css";

const ViewCleaners = () => {
    const [serviceFilter, setServiceFilter] = useState("");
    const [cleaners, setCleaners] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const data = await viewCleaners(serviceFilter);
            setCleaners(data);
            setError("");
        } catch (err) {
            setCleaners([]);
            setError("❌ Failed to fetch cleaners.");
        }
    };

    return (
        <div className="find-cleaners-container">
            <div className="find-cleaners-box">
                <h2>Find Cleaners</h2>
                <div className="search-form">
                    <input
                        type="text"
                        placeholder="Enter service (e.g., window cleaning)"
                        value={serviceFilter}
                        onChange={(e) => setServiceFilter(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                {error && <p className="error-text">{error}</p>}

                {cleaners.length > 0 && (
                    <ul className="cleaner-list">
                        {cleaners.map((cleaner, index) => (
                            <li key={index}>
                                {cleaner}
                                <button
                                    className="view-button"
                                    onClick={() => navigate(`/homeowner/view-cleaner-profile/${cleaner}`)}
                                >
                                    View Profile
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewCleaners;
