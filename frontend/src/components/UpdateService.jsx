import React, { useEffect, useState } from "react";
import { getAvailableCategories, updateService, getCleanerServices } from "../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../styles/UpdateService.css";

const UpdateService = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");
    const [updatedService, setUpdatedService] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesData = await getCleanerServices(cleanerUsername);
                const categoryData = await getAvailableCategories();
                setServices(servicesData);
                setCategories(categoryData);
            } catch (err) {
                setMessage("Failed to load services or categories.");
            }
        };

        fetchData();
    }, [cleanerUsername]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await updateService({
                service_id: selectedServiceId,
                updated_category: updatedCategory,
                updated_service: updatedService,
                updated_price: parseFloat(updatedPrice),
            });
            setMessage(success ? "✅ Service updated successfully." : "❌ Failed to update service.");
        } catch (err) {
            setMessage("An error occurred during update.");
        }
    };

    return (
        <div className="update-service-container">
            <div className="update-service-box">
                <h2>Update Service</h2>
                <form onSubmit={handleSubmit} className="update-service-form">
                    <label>Select Service:</label>
                    <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        required
                    >
                        <option value="">Select Service</option>
                        {services.map((svc) => (
                            <option key={svc.service_id} value={svc.service_id}>
                                {svc.service} — ${svc.price}
                            </option>
                        ))}
                    </select>

                    <label>Select New Category:</label>
                    <select
                        value={updatedCategory}
                        onChange={(e) => setUpdatedCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat.category}>
                                {cat.category}
                            </option>
                        ))}
                    </select>

                    <label>New Service Name:</label>
                    <input
                        type="text"
                        placeholder="Enter new service name"
                        value={updatedService}
                        onChange={(e) => setUpdatedService(e.target.value)}
                        required
                    />

                    <label>New Price:</label>
                    <input
                        type="number"
                        placeholder="Enter new price"
                        value={updatedPrice}
                        onChange={(e) => setUpdatedPrice(e.target.value)}
                        required
                    />

                    <button type="submit" className="yellow-button">Update Service</button>
                    {message && <p>{message}</p>}
                </form>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default UpdateService;
