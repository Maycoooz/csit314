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
    const [showSuccessBox, setShowSuccessBox] = useState(false);
    const navigate = useNavigate();

    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAvailableCategories();
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

        if (!selectedCategory || !newService || !newPrice) {
            setMessage("❌ All fields are required.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        const priceValue = parseFloat(newPrice);
        const isValidPrice = /^\d+(\.\d{1,2})?$/.test(newPrice);

        if (!isValidPrice || priceValue <= 0) {
            setMessage("❌ Price must be a number > 0 with up to 2 decimal places.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const success = await createService({
                cleaner_username: cleanerUsername,
                selected_category: selectedCategory,
                new_service: newService,
                new_price: parseFloat(newPrice),
            });

            if (success) {
                setSelectedCategory("");
                setNewService("");
                setNewPrice("");
                setShowSuccessBox(true);
            } else {
                setMessage("❌ Failed to create service.");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage("❌ An error occurred while creating service.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessBox(false);
        //navigate(-1);
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
                        pattern="^\d+(\.\d{1,2})?$"
                        title="Enter a valid price with up to 2 decimal places"
                        required
                    />

                    <button type="submit" className="green-button">Create Service</button>
                    {message && <p className="error-text">{message}</p>}
                </form>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>✅ Service Created Successfully</h3>
                        <button onClick={handleSuccessClose} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateService;
