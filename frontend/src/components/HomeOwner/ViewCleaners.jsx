import React, { useState } from "react";
import { viewCleaners } from "../../services/homeOwnerService";
import { useNavigate } from "react-router-dom";
import "../../styles/HomeOwner/ViewCleaners.css";
import ViewCleanerProfile from "./ViewCleanerProfile"; // adjust path if needed

const ViewCleaners = () => {
    const [serviceFilter, setServiceFilter] = useState("");
    const [cleaners, setCleaners] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedCleaner, setSelectedCleaner] = useState(null); // for cleaner profile modal
    const navigate = useNavigate();

    const handleSearch = async () => {
        const trimmed = serviceFilter.trim();
        if (!trimmed) {
            setError("❌ Please enter a service.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        try {
            const data = await viewCleaners(trimmed);
            if (data.length === 0) {
                setError("❌ No cleaners found.");
                setCleaners([]);
                setShowModal(false);
                setTimeout(() => setError(""), 3000);
                return;
            }

            setCleaners(data);
            setShowModal(true);
            document.body.classList.add("modal-open");
        } catch (err) {
            setCleaners([]);
            setError("❌ Failed to fetch cleaners.");
            setTimeout(() => setError(""), 3000);
        }

        setServiceFilter("");
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
        //navigate(-1);
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
            </div>

            {selectedCleaner && (
                <ViewCleanerProfile
                cleanerUsername={selectedCleaner}
                onClose={() => { setSelectedCleaner(false); document.body.classList.remove("modal-open");}}
                />
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Matching Cleaners</h2>
                        <ul className="cleaner-list">
                            {cleaners.map((cleaner, index) => (
                                <li key={index} className="cleaner-card">
                                    <div className="cleaner-name">{cleaner}</div>
                                    <button
                                        className="view-button"
                                        onClick={() => {setShowModal(false); setSelectedCleaner(cleaner);}}
                                    >
                                        View Profile
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <br />
                        <button className="back-button" onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewCleaners;
