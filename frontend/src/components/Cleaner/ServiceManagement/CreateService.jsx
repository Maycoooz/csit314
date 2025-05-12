import React, { useEffect, useState } from "react";
import { getAvailableCategories, createService } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/ServiceManagement/CreateService.css";

const CreateService = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newService, setNewService] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAvailableCategories();
                setCategories(data);
            } catch (err) {
                setMessage("Failed to load categories.");
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await createService({
                cleaner_username: cleanerUsername,
                selected_category: selectedCategory,
                new_service: newService,
                new_price: parseFloat(newPrice),
            });
            setMessage(success ? "✅ Service created successfully!" : "❌ Failed to create service.");
        } catch (err) {
            setMessage("An error occurred while creating service.");
        }
    };

    return (
        <div className="create-service-container">
            <div className="create-service-box">
                <h2>Create New Service</h2>
                <form onSubmit={handleSubmit} className="create-service-form">
                    <label>Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat.category}>
                                {cat.category}
                            </option>
                        ))}
                    </select>

                    <label>Service Name:</label>
                    <input
                        type="text"
                        placeholder="Enter service name"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        required
                    />

                    <label>Price:</label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                    />

                    <button type="submit" className="green-button">Create Service</button>
                    {message && <p>{message}</p>}
                </form>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default CreateService;
