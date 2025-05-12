// src/components/PlatformManagement/ServiceCategory/ViewServiceCategory.jsx

import React, { useEffect, useState } from "react";
import { viewAllServiceCategories } from "../../../services/serviceCategoryService";

const ViewServiceCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

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
        <div style={{ marginTop: "30px" }}>
            {error && <p>{error}</p>}
            {!error && categories.length === 0 && <p>No categories found.</p>}
            {!error && categories.length > 0 && (
                <table style={{ margin: "auto", borderCollapse: "collapse", width: "80%" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{cat.category}</td>
                                <td style={tdStyle}>{cat.description}</td>
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
    textAlign: "left"
};

const tdStyle = {
    border: "1px solid #ddd",
    padding: "12px"
};

export default ViewServiceCategory;
