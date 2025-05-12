import React, { useState } from "react";
import { updateServiceCategory } from "../../../services/serviceCategoryService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/ServiceCategory/UpdateServiceCategory.css";

const UpdateServiceCategory = () => {
    const [targetCategory, setTargetCategory] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await updateServiceCategory(
                targetCategory,
                updatedCategory,
                updatedDescription
            );
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
        <div className="update-category-container">
            <div className="update-category-box">
                <h2>Update Service Category</h2>
                <form onSubmit={handleSubmit} className="update-category-form">
                    <input
                        type="text"
                        placeholder="Current Category Name"
                        value={targetCategory}
                        onChange={(e) => setTargetCategory(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="New Category Name"
                        value={updatedCategory}
                        onChange={(e) => setUpdatedCategory(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="New Description"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        rows="4"
                        required
                    />
                    <button type="submit" className="yellow-button">Update Category</button>
                    {message && <p className="message-text">{message}</p>}
                </form>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default UpdateServiceCategory;
