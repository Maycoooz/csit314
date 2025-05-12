import React, { useState } from "react";
import { searchService } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/ServiceManagement/SearchService.css";

const SearchService = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const data = await searchService(query);
            setResults(data);
            setError("");
        } catch (err) {
            setResults([]);
            setError("❌ Search failed.");
        }
    };

    return (
        <div className="search-service-container">
            <div className="search-service-box">
                <h2>Search Services</h2>
                <div className="search-form">
                    <input
                        type="text"
                        placeholder="Enter service name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                {error && <p className="error-text">{error}</p>}

                {results.length > 0 && (
                    <table className="services-table">
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
                )}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default SearchService;
