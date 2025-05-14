import React, { useEffect, useState } from "react";
import { getCleanerProfile, shortlistCleaner } from "../../services/homeOwnerService";
import { useNavigate } from "react-router-dom";
import "../../styles/HomeOwner/ViewCleanerProfile.css";

const ViewCleanerProfile = ({ cleanerUsername }) => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const homeownerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getCleanerProfile(homeownerUsername, cleanerUsername);
                setServices(data);
                setError("");
            } catch (err) {
                setError("❌ Failed to load cleaner profile.");
            }
        };

        fetchServices();
    }, [cleanerUsername, homeownerUsername]);

    const handleShortlist = async (serviceId) => {
        try {
            const success = await shortlistCleaner(homeownerUsername, serviceId);
            setMessage(success ? "✅ Shortlisted successfully." : "⚠️ Already shortlisted.");
        } catch (err) {
            setMessage("❌ Failed to shortlist.");
        }
    };

    return (
        <div className="cleaner-profile-container">
            <div className="cleaner-profile-box">
                <h2>{cleanerUsername}'s Services</h2>

                {error && <p className="error-text">{error}</p>}
                {message && <p className="info-text">{message}</p>}

                <ul className="service-list">
                    {services.map((service) => (
                        <li key={service.service_id}>
                            <strong>{service.service_name}</strong> – ${service.price.toFixed(2)}
                            <button onClick={() => handleShortlist(service.service_id)}>
                                ➕ Shortlist
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewCleanerProfile;
