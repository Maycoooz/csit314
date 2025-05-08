// src/components/UpdateService.jsx
import React, { useEffect, useState } from "react";
import { getAvailableCategories, updateService, getCleanerServices } from "../services/cleanerService";

const UpdateService = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");
    const [updatedService, setUpdatedService] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState("");
    const [message, setMessage] = useState("");

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
            setMessage(success ? "Service updated successfully." : "Failed to update service.");
        } catch (err) {
            setMessage("An error occurred during update.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "inline-block", marginTop: "20px" }}>
            <div>
                <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    required
                    style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
                >
                    <option value="">Select Service</option>
                    {services.map((svc) => (
                        <option key={svc.service_id} value={svc.service_id}>
                            {svc.service} — ${svc.price}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select
                    value={updatedCategory}
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                    required
                    style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
                >
                    <option value="">Select New Category</option>
                    {categories.map((cat, idx) => (
                        <option key={idx} value={cat.category}>
                            {cat.category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="New Service Name"
                    value={updatedService}
                    onChange={(e) => setUpdatedService(e.target.value)}
                    required
                    style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
                />
            </div>
            <div>
                <input
                    type="number"
                    placeholder="New Price"
                    value={updatedPrice}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                    required
                    style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
                />
            </div>
            <button type="submit" style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>
                Update Service
            </button>
            {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
        </form>
    );
};

export default UpdateService;
