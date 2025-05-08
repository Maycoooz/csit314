import React, { useEffect, useState } from "react";
import { getViewStats } from "../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../styles/ViewStats.css";

const ViewStats = () => {
    const [numViews, setNumViews] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getViewStats(cleanerUsername);
                setNumViews(data);
            } catch (err) {
                setError("❌ Failed to load view statistics.");
            }
        };

        fetchStats();
    }, [cleanerUsername]);

    return (
        <div className="view-stats-container">
            <div className="view-stats-box">
                <h2>Service View Statistics</h2>
                {error && <p className="error-text">{error}</p>}
                {numViews !== null && (
                    <p className="view-count">👀 Your services have been viewed <strong>{numViews}</strong> times.</p>
                )}
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewStats;
