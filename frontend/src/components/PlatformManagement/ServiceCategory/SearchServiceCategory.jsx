import React, { useState } from "react";
import { searchServiceCategory } from "../../../services/serviceCategoryService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/ServiceCategory/SearchServiceCategory.css";

const SearchServiceCategory = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
        <div className="search-category-container">
            <div className="search-category-box">
                <h2>Search Service Category</h2>
                <form onSubmit={handleSearch} className="search-category-form">
                    <input
                        type="text"
                        placeholder="Enter category name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    />
                    <button type="submit" className="blue-button">Search</button>
                </form>

                {error && <p className="error-text">{error}</p>}

                {results.length > 0 && (
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((cat, index) => (
                                <tr key={index}>
                                    <td>{cat.category}</td>
                                    <td>{cat.description}</td>
                                    <td>{cat.status}</td>
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

export default SearchServiceCategory;
