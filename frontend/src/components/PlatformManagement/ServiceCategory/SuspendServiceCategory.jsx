// src/components/PlatformManagement/ServiceCategory/SuspendServiceCategory.jsx

import React, { useState } from "react";
import { suspendServiceCategory } from "../../../services/serviceCategoryService";

const SuspendServiceCategory = () => {
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await suspendServiceCategory(category);
            if (success) {
                setMessage("✅ Category suspended successfully.");
                setCategory("");
            } else {
                setMessage("❌ Failed to suspend category.");
            }
        } catch (err) {
            setMessage("❌ Error occurred while suspending category.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
            <div style={{ marginBottom: "15px" }}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                />
            </div>
            <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "6px" }}>
                Suspend Category
            </button>
            {message && <p style={{ marginTop: "15px" }}>{message}</p>}
        </form>
    );
};

export default SuspendServiceCategory;
