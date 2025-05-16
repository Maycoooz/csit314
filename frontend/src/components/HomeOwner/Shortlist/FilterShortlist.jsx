import React, { useState } from "react";
import { filterShortlist } from "../../../services/homeOwnerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/HomeOwner/Shortlist/FilterShortlist.css";

const FilterShortlistPage = () => {
    const [filter, setFilter] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const homeownerUsername = localStorage.getItem("username");

    const handleFilter = async () => {
        const trimmed = filter.trim();
        if (!trimmed) {
            setError("❌ Please enter a keyword to filter.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        try {
            const data = await filterShortlist(homeownerUsername, trimmed);
            if (data.length === 0) {
                setError("❌ No results found.");
                setFiltered([]);
                setShowModal(false);
                setTimeout(() => setError(""), 3000);
                return;
            }

            setFiltered(data);
            setShowModal(true);
            document.body.classList.add("modal-open");
        } catch (err) {
            setFiltered([]);
            setError("❌ Failed to filter shortlist.");
            setTimeout(() => setError(""), 3000);
        }

        setFilter("");
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
        //navigate(-1);
    };

    return (
        <div className="shortlist-container">
            <div className="shortlist-box">
                <h2>Filter Shortlist</h2>
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
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Filtered Shortlist Results</h2>
                        <table className="filter-table">
                            <thead>
                                <tr>
                                    <th>Cleaner</th>
                                    <th>Service ID</th>
                                    <th>Service</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.cleaner_username}</td>
                                        <td>{entry.service_id}</td>
                                        <td>{entry.service}</td>
                                        <td>{entry.category}</td>
                                        <td>${entry.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <button onClick={closeModal} className="back-button">OK</button>
                    </div>
                </div>
            )}

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default FilterShortlistPage;
