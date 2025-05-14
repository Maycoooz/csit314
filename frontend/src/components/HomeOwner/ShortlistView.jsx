import React, { useState, useEffect } from "react";
import {
    viewShortlist,
    filterShortlist,
} from "../../services/homeOwnerService";
import { useNavigate } from "react-router-dom";
import "../../styles/HomeOwner/ShortlistView.css";

const ShortlistView = () => {
    const [shortlist, setShortlist] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const homeownerUsername = localStorage.getItem("username");

    const fetchShortlist = async () => {
        try {
            const data = await viewShortlist(homeownerUsername);
            setShortlist(data);
            setError("");
        } catch (err) {
            setShortlist([]);
            setError("❌ Failed to load shortlist.");
        }
    };

    const handleFilter = async () => {
        if (!filter) return fetchShortlist();

        try {
            const data = await filterShortlist(homeownerUsername, filter);
            setShortlist(data);
            setError("");
        } catch (err) {
            setShortlist([]);
            setError("❌ Failed to filter shortlist.");
        }
    };

    useEffect(() => {
        fetchShortlist();
    }, []);

    return (
        <div className="shortlist-container">
            <div className="shortlist-box">
                <h2>Your Shortlist</h2>

                <div className="filter-form">
                    <input
                        type="text"
                        placeholder="Filter by service (e.g., carpet)"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button onClick={handleFilter}>Apply Filter</button>
                </div>

                {error && <p className="error-text">{error}</p>}

                <ul className="shortlist-list">
                    {shortlist.map((entry, index) => (
                        <li key={index}>
                            <strong>{entry.cleaner_username}</strong>: {entry.service_name} — ${entry.price}
                        </li>
                    ))}
                </ul>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ShortlistView;
