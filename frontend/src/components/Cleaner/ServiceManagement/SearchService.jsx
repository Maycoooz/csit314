import React, { useState } from "react";
import { searchService } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/ServiceManagement/SearchService.css";

const SearchService = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const cleaner_username = localStorage.getItem("username");

    const handleSearch = async () => {
        const trimmed = query.trim();
        if (!trimmed) {
            setError("❌ Please enter a service name.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        try {
            const data = await searchService(cleaner_username, trimmed);

            if (data.length === 0) {
                setError("❌ No service found.");
                setResults([]);
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
            setError("❌ Search failed.");
            setResults([]);
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
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Search Results</h3>
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
                                        <td>${parseFloat(service.price).toFixed(2)}</td>
                                        <td>{service.status}</td>
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

export default SearchService;
