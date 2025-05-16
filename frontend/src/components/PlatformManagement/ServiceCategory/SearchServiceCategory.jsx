import React, { useState } from "react";
import { searchServiceCategory } from "../../../services/serviceCategoryService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/ServiceCategory/SearchServiceCategory.css";

const SearchServiceCategory = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        const trimmed = query.trim();
        if (!trimmed) {
            setError("❌ Please enter a category to search.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        try {
            const data = await searchServiceCategory(trimmed);

            if (data.length === 0) {
                setError("❌ No category found.");
                setShowModal(false);
                setTimeout(() => setError(""), 3000);
                return;
            }

            setResults(data);
            setError("");
            setShowModal(true);
            setQuery("");
            document.body.classList.add("modal-open");
        } catch (err) {
            setResults([]);
            setError("❌ Search failed.");
            setShowModal(false);
            setTimeout(() => setError(""), 3000);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
        //navigate(-1);
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
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Search Results</h3>
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
                        <br />
                        <button onClick={closeModal} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchServiceCategory;
