import React, { useState, useEffect } from "react";
import { viewPastTransactions } from "../../../services/homeOwnerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/HomeOwner/PastTransactions/ViewPastTransactionsHO.css";

const ViewPastTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const homeownerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await viewPastTransactions(homeownerUsername);
                setTransactions(data);
                setShowModal(true);
                document.body.classList.add("modal-open");
            } catch (err) {
                setError("❌ Failed to load transactions.");
                setTimeout(() => setError(""), 3000);
            }
        };

        if (homeownerUsername) {
            fetchData();
        }
    }, [homeownerUsername]);

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
        navigate(-1);
    };

    return (
        <div className="transactions-container">
            {error && <p className="error-text">{error}</p>}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Past Transactions</h2>
                        {transactions.length > 0 ? (
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
                                            <td>${parseFloat(tx.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="no-results">No past transactions found.</p>
                        )}
                        <br />
                        <button className="back-button" onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewPastTransactions;
