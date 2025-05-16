import React, { useEffect, useState } from "react";
import {
    viewAllServiceCategories,
    updateServiceCategory
} from "../../../services/serviceCategoryService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/ServiceCategory/UpdateServiceCategory.css";

const UpdateServiceCategory = () => {
    const [categories, setCategories] = useState([]);
    const [targetCategory, setTargetCategory] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
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

        if (!targetCategory || !updatedCategory || !updatedDescription) {
            setMessage("❌ All fields are required.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const success = await updateServiceCategory(
                targetCategory,
                updatedCategory,
                updatedDescription
            );

            if (success) {
                setTargetCategory("");
                setUpdatedCategory("");
                setUpdatedDescription("");
                setShowSuccessBox(true);
            } else {
                setMessage("❌ Failed to update category.");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage("❌ Error occurred while updating category.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessBox(false);
        navigate(-1);
    };

    return (
        <div className="update-category-container">
            <div className="update-category-box">
                <h2>Update Service Category</h2>
                <form onSubmit={handleSubmit} className="update-category-form">
                    <label>Current Category:</label>
                    <select
                        value={targetCategory}
                        onChange={(e) => setTargetCategory(e.target.value)}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat.category}>
                                {cat.category}
                            </option>
                        ))}
                    </select>

                    <label>New Category Name:</label>
                    <input
                        type="text"
                        placeholder="Enter new category name"
                        value={updatedCategory}
                        onChange={(e) => setUpdatedCategory(e.target.value)}
                        required
                    />

                    <label>New Description:</label>
                    <textarea
                        placeholder="Enter new description"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        rows="4"
                        required
                    />

                    <button type="submit" className="update-button">Update Category</button>
                    {message && <p className="error-text">{message}</p>}
                </form>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>✅ Category Updated Successfully</h3>
                        <button onClick={handleSuccessClose} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateServiceCategory;
