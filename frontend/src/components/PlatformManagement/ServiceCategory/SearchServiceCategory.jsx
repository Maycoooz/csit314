// src/components/PlatformManagement/ServiceCategory/SearchServiceCategory.jsx

import React, { useState } from "react";
import { searchServiceCategory } from "../../../services/serviceCategoryService";

const SearchServiceCategory = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const data = await searchServiceCategory(query);
            setResults(data);
            setError("");
        } catch (err) {
            setResults([]);
            setError("❌ Search failed.");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Enter category name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                />
                <button
                    type="submit"
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                    }}
                >
                    Search
                </button>
            </form>

            {error && <p>{error}</p>}

            {results.length > 0 && (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Description</th>
                            <th style={thStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((cat, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{cat.category}</td>
                                <td style={tdStyle}>{cat.description}</td>
                                <td style={tdStyle}>{cat.status}</td>
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
    padding: "12px",
    fontWeight: "bold",
    textAlign: "left",
};

const tdStyle = {
    border: "1px solid #ddd",
    padding: "12px",
};

export default SearchServiceCategory;
