import React, { useEffect, useState } from "react";
import { getCleanerServices, suspendService } from "../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../styles/SuspendService.css";

const SuspendService = () => {
    const [services, setServices] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getCleanerServices(cleanerUsername);
                setServices(data);
            } catch (err) {
                setMessage("Failed to load services.");
            }
        };

        fetchServices();
    }, [cleanerUsername]);

    const handleSuspend = async (e) => {
        e.preventDefault();
        try {
            const success = await suspendService({ service_id: selectedServiceId });
            setMessage(success ? "✅ Service suspended successfully." : "❌ Failed to suspend service.");
        } catch (err) {
            setMessage("An error occurred during suspension.");
        }
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
                                {svc.service} — ${svc.price}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="red-button">Suspend Service</button>
                    {message && <p>{message}</p>}
                </form>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default SuspendService;
