import React, { useEffect, useState } from "react";
import { getPastTransactions } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/Statistics/ViewPastTransactions.css";

const ViewPastTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const result = await getPastTransactions(cleanerUsername);
                setTransactions(result);
            } catch (err) {
                console.error("Failed to load transactions:", err);
                setError("⚠️ Could not load past transactions.");
            }
        };

        if (cleanerUsername) {
            fetchTransactions();
        }
    }, [cleanerUsername]);

    return (
        <div className="transactions-container">
            <div className="transactions-box">
                <h2>Past Transactions</h2>
                {error && <p className="error-text">{error}</p>}
                {transactions.length > 0 ? (
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
                            {transactions.map((txn, index) => (
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
                    !error && <p className="no-results">No past transactions found.</p>
                )}
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewPastTransactions;
