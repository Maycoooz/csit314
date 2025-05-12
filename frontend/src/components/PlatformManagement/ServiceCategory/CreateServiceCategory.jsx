// src/components/PlatformManagement/ServiceCategory/CreateServiceCategory.jsx

import React, { useState } from "react";
import { createServiceCategory } from "../../../services/serviceCategoryService";

const CreateServiceCategory = () => {
    const [newCategory, setNewCategory] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await createServiceCategory(newCategory, newDescription);
            if (success) {
                setMessage("✅ Category created successfully.");
                setNewCategory("");
                setNewDescription("");
            } else {
                setMessage("❌ Failed to create category.");
            }
        } catch (err) {
            setMessage("❌ Error occurred while creating category.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
            <div style={{ marginBottom: "15px" }}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                />
            </div>
            <div style={{ marginBottom: "15px" }}>
                <textarea
                    placeholder="Category Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    required
                    rows="4"
                    style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                />
            </div>
            <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "6px" }}>
                Create Category
            </button>
            {message && <p style={{ marginTop: "15px" }}>{message}</p>}
        </form>
    );
};

export default CreateServiceCategory;
