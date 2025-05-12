import React, { useState } from "react";
import { getDailyReport } from "../../../services/reportService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/Report/ViewDailyReport.css";

const ViewDailyReport = () => {
    const [date, setDate] = useState("");
    const [report, setReport] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await getDailyReport(date);
            setReport(data);
            setError("");
        } catch (err) {
            setReport([]);
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

                {report.length > 0 && (
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Homeowner</th>
                                <th>Cleaner</th>
                                <th>Service ID</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.map((txn, index) => (
                                <tr key={index}>
                                    <td>{txn.transaction_id}</td>
                                    <td>{txn.homeowner_username}</td>
                                    <td>{txn.cleaner_username}</td>
                                    <td>{txn.service_id}</td>
                                    <td>{txn.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewDailyReport;
