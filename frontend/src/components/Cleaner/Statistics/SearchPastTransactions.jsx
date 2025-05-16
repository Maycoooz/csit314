import React, { useState } from "react";
import { searchPastTransactions } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/Statistics/SearchPastTransactions.css";

const SearchPastTransactions = () => {
    const [filter, setFilter] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const cleanerUsername = localStorage.getItem("username");

    const handleSearch = async () => {
        const trimmed = filter.trim();
        if (!trimmed) {
            setError("❌ Please enter a service name.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        try {
            const data = await searchPastTransactions(cleanerUsername, trimmed);

            if (data.length === 0) {
                setError("❌ No results found.");
                setResults([]);
                setShowModal(false);
                setTimeout(() => setError(""), 3000);
                return;
            }

            setResults(data);
            setError("");
            setShowModal(true);
            document.body.classList.add("modal-open");
        } catch (err) {
            console.error("Search failed:", err);
            setError("❌ Unable to fetch search results.");
            setResults([]);
            setTimeout(() => setError(""), 3000);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
        //navigate(-1);
    };

    return (
        <div className="search-transactions-container">
            <div className="search-transactions-box">
                <h2>Search Past Transactions</h2>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Enter service name..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                {error && <p className="error-text">{error}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Filtered Results</h3>
                        <table className="transactions-table">
                            <thead>
                                <tr>
                                    <th>Home Owner Username</th>
                                    <th>Category</th>
                                    <th>Service</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((txn, index) => (
                                    <tr key={index}>
                                        <td>{txn.homeowner_username}</td>
                                        <td>{txn.category}</td>
                                        <td>{txn.service}</td>
                                        <td>${parseFloat(txn.price).toFixed(2)}</td>
                                        <td>{txn.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <button className="back-button" onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPastTransactions;
