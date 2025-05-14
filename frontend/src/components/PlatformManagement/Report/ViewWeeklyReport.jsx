import React, { useState } from "react";
import { getWeeklyReport } from "../../../services/reportService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/Report/ViewWeeklyReport.css";

const ViewWeeklyReport = ({ setNavbarVisible }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [report, setReport] = useState([]);
    const [error, setError] = useState("");
    const [showReport, setShowReport] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await getWeeklyReport(startDate, endDate);
            setReport(data);
            setError("");
            setShowReport(true);
            setNavbarVisible?.(false); // hide navbar
        } catch (err) {
            setReport([]);
            setError("❌ Failed to fetch weekly report.");
        }
    };

    const handleClose = () => {
        setShowReport(false);
        setNavbarVisible?.(true); // restore navbar
    };

    return (
        <div className="weekly-report-container">
            <div className="weekly-report-box">
                <h2>Weekly Transaction Report</h2>
                <form onSubmit={handleSubmit} className="weekly-report-form">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                        const newStart = e.target.value;
                        setStartDate(newStart);

                        // Calculate and set the end date
                        const start = new Date(newStart);
                        const end = new Date(start);
                        end.setDate(start.getDate() + 6);

                        const endStr = end.toISOString().split("T")[0];
                        setEndDate(endStr);
                    }} required
                    />

                    <input
                        type="date"
                        value={endDate}
                        readOnly
                        disabled
                        className="readonly-input"
                    />
                    
                    <button type="submit">Get Report</button>
                </form>

                {error && <p className="error-text">{error}</p>}
            </div>

            {showReport && report && (
    <div className="report-modal-overlay">
        <div className="report-modal">
            <button className="close-button" onClick={handleClose}>✖</button>

            <h3>🧾 Weekly Transactions ({report.transaction_count})</h3>
            <table className="report-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Homeowner</th>
                        <th>Cleaner</th>
                        <th>Service</th>
                        <th>Category</th>
                        <th>Price ($)</th>
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
                            <td>{txn.price.toFixed(2)}</td>
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
                        <th>Services Bought</th>
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
                        <th>Total Revenue ($)</th>
                        <th>Average Price ($)</th>
                        <th>Times Used</th>
                    </tr>
                </thead>
                <tbody>
                    {report.category_summary.map((cat, index) => (
                        <tr key={index}>
                            <td>{cat.category}</td>
                            <td>{cat.total_revenue.toFixed(2)}</td>
                            <td>{cat.average_price.toFixed(2)}</td>
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

export default ViewWeeklyReport;
