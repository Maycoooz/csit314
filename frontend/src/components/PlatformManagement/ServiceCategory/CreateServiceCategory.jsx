import React, { useState } from "react";
import { createServiceCategory } from "../../../services/serviceCategoryService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/ServiceCategory/CreateServiceCategory.css";

const CreateServiceCategory = () => {
    const [newCategory, setNewCategory] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

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
                    {message && <p className="message-text">{message}</p>}
                </form>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default CreateServiceCategory;
