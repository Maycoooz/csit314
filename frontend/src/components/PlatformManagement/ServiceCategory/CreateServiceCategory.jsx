import React, { useState } from "react";
import { createServiceCategory } from "../../../services/serviceCategoryService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/ServiceCategory/CreateServiceCategory.css";

const CreateServiceCategory = () => {
    const [newCategory, setNewCategory] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccessBox, setShowSuccessBox] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newCategory.trim() || !newDescription.trim()) {
            setMessage("❌ All fields are required.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const success = await createServiceCategory(newCategory, newDescription);
            if (success) {
                setNewCategory("");
                setNewDescription("");
                setShowSuccessBox(true);
            } else {
                setMessage("❌ Failed to create category.");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage("❌ Error occurred while creating category.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessBox(false);
        //navigate(-1);
    };

    return (
        <div className="create-category-container">
            <div className="create-category-box">
                <h2>Create Service Category</h2>
                <form onSubmit={handleSubmit} className="create-category-form">
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Category Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        rows="4"
                        required
                    />
                    <button type="submit" className="green-button">Create Category</button>
                    {message && <p className="error-text">{message}</p>}
                </form>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>✅ Category Created Successfully</h3>
                        <button onClick={handleSuccessClose} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateServiceCategory;
