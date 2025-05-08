// src/components/SearchService.jsx
import React, { useState } from "react";
import { searchService } from "../services/cleanerService";

const SearchService = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        try {
            const data = await searchService({ target_service: query });
            setResults(data);
            setError("");
        } catch (err) {
            setResults([]);
            setError("Search failed.");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter service name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
            />
            <button onClick={handleSearch} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Search
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {results.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((service, idx) => (
                                <tr key={idx}>
                                    <td>{service.service}</td>
                                    <td>{service.category}</td>
                                    <td>${service.price}</td>
                                    <td>{service.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SearchService;
