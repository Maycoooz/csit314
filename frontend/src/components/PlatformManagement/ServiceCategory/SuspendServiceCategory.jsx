import React, { useState, useEffect } from "react";
import {
    viewAllServiceCategories,
    suspendServiceCategory
} from "../../../services/serviceCategoryService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/ServiceCategory/SuspendServiceCategory.css";

const SuspendServiceCategory = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccessBox, setShowSuccessBox] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await viewAllServiceCategories();
                setCategories(data);
            } catch (err) {
                setMessage("❌ Failed to load categories.");
                setTimeout(() => setMessage(""), 3000);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category) {
            setMessage("❌ Please select a category.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const success = await suspendServiceCategory(category);
            if (success) {
                setCategory("");
                setShowSuccessBox(true);
            } else {
                setMessage("❌ Failed to suspend category.");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage("❌ Error occurred while suspending category.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessBox(false);
        //navigate(-1);
    };

    return (
        <div className="suspend-category-container">
            <div className="suspend-category-box">
                <h2>Suspend Service Category</h2>
                <form onSubmit={handleSubmit} className="suspend-category-form">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat.category}>
                                {cat.category}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="red-button">Suspend Category</button>
                    {message && <p className="error-text">{message}</p>}
                </form>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>✅ Category Suspended Successfully</h3>
                        <button onClick={handleSuccessClose} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuspendServiceCategory;
