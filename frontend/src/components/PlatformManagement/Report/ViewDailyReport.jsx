// src/components/PlatformManagement/Report/ViewDailyReport.jsx

import React, { useState } from "react";
import { getDailyReport } from "../../../services/reportService";

const ViewDailyReport = () => {
    const [date, setDate] = useState("");
    const [report, setReport] = useState([]);
    const [error, setError] = useState("");

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
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    style={{ padding: "10px", fontSize: "16px", width: "100%" }}
                />
                <button
                    type="submit"
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#17a2b8",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                    }}
                >
                    Get Report
                </button>
            </form>

            {error && <p>{error}</p>}

            {report.length > 0 && (
                <table style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={thStyle}>Transaction ID</th>
                            <th style={thStyle}>Homeowner</th>
                            <th style={thStyle}>Cleaner</th>
                            <th style={thStyle}>Service ID</th>
                            <th style={thStyle}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((txn, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{txn.transaction_id}</td>
                                <td style={tdStyle}>{txn.homeowner_username}</td>
                                <td style={tdStyle}>{txn.cleaner_username}</td>
                                <td style={tdStyle}>{txn.service_id}</td>
                                <td style={tdStyle}>{txn.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const thStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    fontWeight: "bold",
    textAlign: "left",
};

const tdStyle = {
    border: "1px solid #ddd",
    padding: "10px",
};

export default ViewDailyReport;
