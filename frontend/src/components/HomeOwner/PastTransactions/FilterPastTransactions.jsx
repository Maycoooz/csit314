// src/pages/HomeOwner/FilterPastTransactionsPage.jsx
import React, { useState } from "react";
import { filterPastTransactions } from "../../../services/homeOwnerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/HomeOwner/PastTransactions/FilterPastTransactions.css";

const FilterPastTransactions = () => {
    const [filter, setFilter] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const homeownerUsername = localStorage.getItem("username");

    const handleFilter = async () => {
        if (!filter) {
            setError("❌ Please enter a filter value.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        try {
            const data = await filterPastTransactions(homeownerUsername, filter);
            setFiltered(data);
            setShowModal(true);
            document.body.classList.add("modal-open");
            setError("");
        } catch (err) {
            setFiltered([]);
            setError("❌ Failed to filter transactions.");
            setTimeout(() => setError(""), 3000);
        }

        setFilter("");
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
    };

    return (
        <div className="transactions-container">
            <div className="transactions-box">
                <h2>Filter Past Transactions</h2>
                <div className="filter-form">
                    <input
                        type="text"
                        placeholder="Filter by service name"
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
                        <h3>Filtered Transactions</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Cleaner</th>
                                    <th>Service</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((tx, index) => (
                                    <tr key={index}>
                                        <td>{tx.transaction_id}</td>
                                        <td>{tx.date}</td>
                                        <td>{tx.cleaner_username}</td>
                                        <td>{tx.service}</td>
                                        <td>{tx.category}</td>
                                        <td>${tx.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <button onClick={closeModal} className="back-button">Close</button>
                    </div>
                </div>
            )}

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default FilterPastTransactions;
