// src/components/PlatformManagement/ServiceCategory/UpdateServiceCategory.jsx

import React, { useState } from "react";
import { updateServiceCategory } from "../../../services/serviceCategoryService";

const UpdateServiceCategory = () => {
    const [targetCategory, setTargetCategory] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await updateServiceCategory(targetCategory, updatedCategory, updatedDescription);
            if (success) {
                setMessage("✅ Category updated successfully.");
                setTargetCategory("");
                setUpdatedCategory("");
                setUpdatedDescription("");
            } else {
                setMessage("❌ Failed to update category.");
            }
        } catch (err) {
            setMessage("❌ Error occurred while updating category.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
            <div style={{ marginBottom: "15px" }}>
                <input
                    type="text"
                    placeholder="Current Category Name"
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                />
            </div>
            <div style={{ marginBottom: "15px" }}>
                <input
                    type="text"
                    placeholder="New Category Name"
                    value={updatedCategory}
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                />
            </div>
            <div style={{ marginBottom: "15px" }}>
                <textarea
                    placeholder="New Description"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                    required
                    rows="4"
                    style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                />
            </div>
            <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#ffc107", color: "black", border: "none", borderRadius: "6px" }}>
                Update Category
            </button>
            {message && <p style={{ marginTop: "15px" }}>{message}</p>}
        </form>
    );
};

export default UpdateServiceCategory;
