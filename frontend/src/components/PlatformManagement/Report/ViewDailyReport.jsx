import React, { useState } from "react";
import { getDailyReport } from "../../../services/reportService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/Report/ViewDailyReport.css";

const ViewDailyReport = ({ setNavbarVisible }) => {
    const [date, setDate] = useState("");
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");
    const [showReport, setShowReport] = useState(false);
    

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await getDailyReport(date);
            setReport(data);
            setError("");
            setShowReport(true);
            setNavbarVisible(false); // ❗️ hide navbar
        } catch (err) {
            console.error("Fetch failed:", err);
            setReport(null);
            setError("❌ Failed to fetch report.");
        }
    };

    return (
    <div className="daily-report-container">
        <div className="daily-report-box">
            <h2>Daily Transaction Report</h2>
            <form onSubmit={handleSubmit} className="daily-report-form">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">Get Report</button>
            </form>

            {error && <p className="error-text">{error}</p>}
        </div>

       {showReport && report && (
    <div className="report-modal-overlay">
        <div className="report-modal">
            <button className="close-button" onClick={() => {setShowReport(false); setNavbarVisible(true);}}>✖</button>

            <h3>🧾 Transaction Details ({report.transaction_count})</h3>
            <table className="report-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Homeowner</th>
                        <th>Cleaner</th>
                        <th>Service</th>
                        <th>Category</th>
                        <th>Price ($)</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {report.transactions.map((txn) => (
                        <tr key={txn.transaction_id}>
                            <td>{txn.transaction_id}</td>
                            <td>{txn.homeowner_username}</td>
                            <td>{txn.cleaner_username}</td>
                            <td>{txn.service}</td>
                            <td>{txn.category}</td>
                            <td>{txn.price.toFixed(2)}</td>
                            <td>{txn.date}</td>
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
                    {report.usage_stats.map((stat, idx) => (
                        <tr key={idx}>
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
                    {report.category_summary.map((cat, idx) => (
                        <tr key={idx}>
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

export default ViewDailyReport;
