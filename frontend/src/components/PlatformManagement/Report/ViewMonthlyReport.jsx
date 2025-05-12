import React, { useState } from "react";
import { getMonthlyReport } from "../../../services/reportService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/Report/ViewMonthlyReport.css";

const ViewMonthlyReport = () => {
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [report, setReport] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await getMonthlyReport(year, month);
            setReport(data);
            setError("");
        } catch (err) {
            setReport([]);
            setError("❌ Failed to fetch monthly report.");
        }
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

export default ViewMonthlyReport;
