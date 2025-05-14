import React, { useEffect, useState } from "react";
import { viewAllServiceCategories } from "../../../services/serviceCategoryService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/ServiceCategory/ViewAllServiceCategories.css";

const ViewServiceCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await viewAllServiceCategories();
                setCategories(data);
            } catch (err) {
                setError("❌ Failed to load service categories.");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="view-category-container">
            <div className="view-category-box">
                <h2>All Service Categories</h2>
                {error && <p className="error-text">{error}</p>}
                {!error && categories.length === 0 && <p>No categories found.</p>}
                {!error && categories.length > 0 && (
                    <table className="category-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, index) => (
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

export default ViewServiceCategory;
