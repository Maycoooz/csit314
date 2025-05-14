import React, { useState } from "react";
import { getMonthlyReport } from "../../../services/reportService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/Report/ViewMonthlyReport.css";

const ViewMonthlyReport = ({ setNavbarVisible }) => {
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");
    const [showReport, setShowReport] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await getMonthlyReport(year, month);
            setReport(data);
            setError("");
            setShowReport(true);
            setNavbarVisible?.(false); // hide navbar
        } catch (err) {
            setReport(null);
            setError("❌ Failed to fetch monthly report.");
        }
    };

    const handleClose = () => {
        setShowReport(false);
        setNavbarVisible?.(true); // show navbar
    };

    return (
        <div className="monthly-report-container">
            <div className="monthly-report-box">
                <h2>Monthly Transaction Report</h2>
                <form onSubmit={handleSubmit} className="monthly-report-form">
                    <input
                        type="number"
                        placeholder="Enter Year (e.g. 2025)"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Enter Month (1-12)"
                        min="1"
                        max="12"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                    />
                    <button type="submit">Get Report</button>
                </form>

                {error && <p className="error-text">{error}</p>}
            </div>

            {showReport && report && (
                <div className="report-modal-overlay">
                    <div className="report-modal">
                        <button className="close-button" onClick={handleClose}>✖</button>

                        <h3>🧾 Transactions</h3>
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Homeowner</th>
                                    <th>Cleaner</th>
                                    <th>Service</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.transactions.map((txn, index) => (
                                    <tr key={index}>
                                        <td>{txn.transaction_id}</td>
                                        <td>{txn.date}</td>
                                        <td>{txn.homeowner_username}</td>
                                        <td>{txn.cleaner_username}</td>
                                        <td>{txn.service}</td>
                                        <td>{txn.category}</td>
                                        <td>${txn.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h3>📊 Usage Stats</h3>
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Cleaner</th>
                                    <th>Service</th>
                                    <th>Category</th>
                                    <th>Times Used</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.usage_stats.map((stat, index) => (
                                    <tr key={index}>
                                        <td>{stat.cleaner_username}</td>
                                        <td>{stat.service}</td>
                                        <td>{stat.category}</td>
                                        <td>{stat.services_bought}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h3>💰 Category Summary</h3>
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Total Revenue</th>
                                    <th>Average Price</th>
                                    <th>Times Used</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.category_summary.map((cat, index) => (
                                    <tr key={index}>
                                        <td>{cat.category}</td>
                                        <td>${cat.total_revenue.toFixed(2)}</td>
                                        <td>${cat.average_price.toFixed(2)}</td>
                                        <td>{cat.times_used}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewMonthlyReport;
