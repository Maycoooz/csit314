import React, { useEffect, useState } from "react";
import { getPastTransactions } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/Statistics/ViewPastTransactions.css";

const ViewPastTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const result = await getPastTransactions(cleanerUsername);
                setTransactions(result);
                setShowModal(true);
                document.body.classList.add("modal-open");
            } catch (err) {
                console.error("Failed to load transactions:", err);
                setError("⚠️ Could not load past transactions.");
            }
        };

        if (cleanerUsername) {
            fetchTransactions();
        }
    }, [cleanerUsername]);

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
                                        <th>Home Owner Username</th>
                                        <th>Category</th>
                                        <th>Service</th>
                                        <th>Date</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((txn, index) => (
                                        <tr key={index}>
                                            <td>{txn.homeowner_username}</td>
                                            <td>{txn.category}</td>
                                            <td>{txn.service}</td>
                                            <td>{txn.date}</td>
                                            <td>${parseFloat(txn.price).toFixed(2)}</td>
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
