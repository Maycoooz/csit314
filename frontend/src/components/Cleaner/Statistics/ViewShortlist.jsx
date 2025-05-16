import React, { useEffect, useState } from "react";
import { getNumShortlisted } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/Statistics/ViewShortlist.css";

const ViewShortlist = () => {
    const [shortlistCount, setShortlistCount] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchShortlist = async () => {
            try {
                const count = await getNumShortlisted(cleanerUsername);
                setShortlistCount(count.shortlist_count);
            } catch (err) {
                setError("❌ Failed to load shortlist count");
                console.error(err);
            }
        };

        if (cleanerUsername) {
            fetchShortlist();
        }
    }, [cleanerUsername]);

    return (
        <div className="shortlist-container">
            <div className="shortlist-box">
                <h2>Shortlisted Services</h2>
                {error && <p className="error-text">{error}</p>}
                {shortlistCount !== null ? (
                    <p>⭐ Total shortlisted services: <strong>{shortlistCount}</strong></p>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewShortlist;
