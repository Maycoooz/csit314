import React, { useState } from "react";
import { getWeeklyReport } from "../../../services/reportService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/Report/ViewWeeklyReport.css";

const ViewWeeklyReport = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [report, setReport] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await getWeeklyReport(startDate, endDate);
            setReport(data);
            setError("");
        } catch (err) {
            setReport([]);
            setError("❌ Failed to fetch weekly report.");
        }
    };

    return (
        <div className="weekly-report-container">
            <div className="weekly-report-box">
                <h2>Weekly Transaction Report</h2>
                <form onSubmit={handleSubmit} className="weekly-report-form">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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

export default ViewWeeklyReport;
