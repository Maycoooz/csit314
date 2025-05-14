import React, { useState } from "react";
import { searchPastTransactions } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/Statistics/SearchPastTransactions.css";

const SearchPastTransactions = () => {
    const [filter, setFilter] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();

    const cleanerUsername = localStorage.getItem("username");

    const handleSearch = async () => {
        try {
            const data = await searchPastTransactions(cleanerUsername, filter);
            setResults(data);
            setError("");
            setHasSearched(true);
        } catch (err) {
            console.error("Search failed:", err);
            setError("❌ Unable to fetch search results.");
            setResults([]);
            setHasSearched(true);
        }
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

                {results.length > 0 ? (
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Service</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((txn, index) => (
                                <tr key={index}>
                                    <td>{txn.transaction_id}</td>
                                    <td>{txn.service}</td>
                                    <td>{txn.customer_username}</td>
                                    <td>{txn.date}</td>
                                    <td>${txn.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    hasSearched && <p className="no-results">No results to display.</p>
                )}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default SearchPastTransactions;
