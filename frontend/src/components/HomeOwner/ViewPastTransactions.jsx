import React, { useState, useEffect } from "react";
import {
    viewPastTransactions,
    filterPastTransactions
} from "../../services/homeOwnerService";
import { useNavigate } from "react-router-dom";
import "../../styles/HomeOwner/ViewPastTransactions.css";

const ViewPastTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const homeownerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await viewPastTransactions(homeownerUsername);
                setTransactions(data);
            } catch (err) {
                setTransactions([]);
                setError("❌ Failed to load transactions.");
            }
        };

        fetchData();
    }, [homeownerUsername]);

    const handleFilter = async () => {
        if (!filter) return;

        try {
            const data = await filterPastTransactions(homeownerUsername, filter);
            setFiltered(data);
            setShowModal(true);
            document.body.classList.add("modal-open");
        } catch (err) {
            setFiltered([]);
            setError("❌ Failed to filter transactions.");
        }

        setFilter(""); // clear input after filter
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

            <div className="transactions-table-box">
                <h3>All Transactions</h3>
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Cleaner</th>
                            <th>Service</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx, index) => (
                            <tr key={index}>
                                <td>{tx.date}</td>
                                <td>{tx.cleaner_username}</td>
                                <td>{tx.service}</td>
                                <td>{tx.category}</td>
                                <td>${tx.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

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
        </div>
    );
};

export default ViewPastTransactions;
