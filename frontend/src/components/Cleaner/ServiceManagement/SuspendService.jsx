import React, { useEffect, useState } from "react";
import { getCleanerServices, suspendService } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/ServiceManagement/SuspendService.css";

const SuspendService = () => {
    const [services, setServices] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccessBox, setShowSuccessBox] = useState(false);
    const navigate = useNavigate();

    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getCleanerServices(cleanerUsername);
                setServices(data);
            } catch (err) {
                setMessage("❌ Failed to load services.");
                setTimeout(() => setMessage(""), 3000);
            }
        };

        fetchServices();
    }, [cleanerUsername]);

    const handleSuspend = async (e) => {
        e.preventDefault();

        if (!selectedServiceId) {
            setMessage("❌ Please select a service.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const success = await suspendService({ service_id: selectedServiceId });
            if (success) {
                setSelectedServiceId("");
                setShowSuccessBox(true);
            } else {
                setMessage("❌ Failed to suspend service.");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage("❌ An error occurred during suspension.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessBox(false);
        navigate(-1);
    };

    return (
        <div className="suspend-service-container">
            <div className="suspend-service-box">
                <h2>Suspend Service</h2>
                <form onSubmit={handleSuspend} className="suspend-service-form">
                    <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        required
                    >
                        <option value="">Select Service to Suspend</option>
                        {services.map((svc) => (
                            <option key={svc.service_id} value={svc.service_id}>
                                {svc.service} — ${parseFloat(svc.price).toFixed(2)}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="red-button">Suspend Service</button>
                    {message && <p className="error-text">{message}</p>}
                </form>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {showSuccessBox && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>✅ Service Suspended Successfully</h3>
                        <button onClick={handleSuccessClose} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuspendService;
