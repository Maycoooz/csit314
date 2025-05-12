import React, { useState } from "react";
import { suspendServiceCategory } from "../../../services/serviceCategoryService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/ServiceCategory/SuspendServiceCategory.css";

const SuspendServiceCategory = () => {
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

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
        <div className="suspend-category-container">
            <div className="suspend-category-box">
                <h2>Suspend Service Category</h2>
                <form onSubmit={handleSubmit} className="suspend-category-form">
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <button type="submit" className="red-button">Suspend Category</button>
                    {message && <p className="message-text">{message}</p>}
                </form>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default SuspendServiceCategory;
