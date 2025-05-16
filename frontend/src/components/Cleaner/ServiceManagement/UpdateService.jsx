import React, { useEffect, useState } from "react";
import { getAvailableCategories, updateService, getCleanerServices } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/ServiceManagement/UpdateService.css";

const UpdateService = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");
    const [updatedService, setUpdatedService] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccessBox, setShowSuccessBox] = useState(false);

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
                setMessage("❌ Failed to load services or categories.");
                setTimeout(() => setMessage(""), 3000);
            }
        };

        fetchData();
    }, [cleanerUsername]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedServiceId || !updatedCategory || !updatedService || !updatedPrice) {
            setMessage("❌ All fields are required.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        const priceValue = parseFloat(updatedPrice);
        const isValidPrice = /^\d+(\.\d{1,2})?$/.test(updatedPrice);

        if (!isValidPrice || priceValue <= 0) {
            setMessage("❌ Price must be > 0 and up to 2 decimal places.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const success = await updateService({
                service_id: selectedServiceId,
                updated_category: updatedCategory,
                updated_service: updatedService,
                updated_price: priceValue,
            });

            if (success) {
                setSelectedServiceId("");
                setUpdatedCategory("");
                setUpdatedService("");
                setUpdatedPrice("");
                setShowSuccessBox(true);
            } else {
                setMessage("❌ Failed to update service.");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage("❌ An error occurred during update.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessBox(false);
        navigate(-1);
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
                                {svc.service} — ${parseFloat(svc.price).toFixed(2)}
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
                        type="text"
                        placeholder="Enter new price"
                        value={updatedPrice}
                        onChange={(e) => setUpdatedPrice(e.target.value)}
                        required
                        pattern="^\d+(\.\d{1,2})?$"
                        title="Price must be a number with up to 2 decimal places"
                    />

                    <button type="submit" className="yellow-button">Update Service</button>
                    {message && <p className="error-text">{message}</p>}
                </form>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>✅ Service Updated Successfully</h3>
                        <button onClick={handleSuccessClose} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateService;
