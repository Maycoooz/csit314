import React, { useEffect, useState } from "react";
import {
    getCleanerProfile,
    shortlistCleaner,
    viewShortlist
} from "../../services/homeOwnerService";
import { useNavigate } from "react-router-dom";
import "../../styles/HomeOwner/ViewCleanerProfile.css";

const ViewCleanerProfile = ({ cleanerUsername }) => {
    const [services, setServices] = useState([]);
    const [shortlistedIds, setShortlistedIds] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const homeownerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, shortlistData] = await Promise.all([
                    getCleanerProfile(homeownerUsername, cleanerUsername),
                    viewShortlist(homeownerUsername)
                ]);

                setServices(profileData);
                setShortlistedIds(shortlistData.map((s) => s.service_id));
                setError("");
            } catch (err) {
                setError("❌ Failed to load cleaner profile or shortlist.");
            }
        };

        fetchData();
    }, [cleanerUsername, homeownerUsername]);

    const handleShortlist = async (serviceId) => {
        try {
            const success = await shortlistCleaner(homeownerUsername, serviceId);
            if (success) {
                setShortlistedIds((prev) => [...prev, serviceId]);
                setMessage("✅ Shortlisted successfully.");
            } else {
                setMessage("⚠️ Already shortlisted.");
            }
        } catch (err) {
            setMessage("❌ Failed to shortlist.");
        }
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <div className="cleaner-profile-container">
            <div className="cleaner-profile-box">
                <h2>{cleanerUsername}'s Services</h2>

                {error && <p className="error-text">{error}</p>}
                {message && <p className="info-text">{message}</p>}

                <table className="service-table">
                    <thead>
                        <tr>
                            <th>Service ID</th>
                            <th>Service</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services
                            .filter((service) => service.status === "active")
                            .map((service) => (
                                <tr key={service.service_id}>
                                    <td>{service.service_id}</td>
                                    <td>{service.service}</td>
                                    <td>{service.category}</td>
                                    <td>${service.price.toFixed(2)}</td>
                                    <td>{service.status}</td>
                                    <td>
                                        <button
                                            onClick={() => handleShortlist(service.service_id)}
                                            disabled={shortlistedIds.includes(service.service_id)}
                                        >
                                            {shortlistedIds.includes(service.service_id)
                                                ? "✔ Shortlisted"
                                                : "➕ Shortlist"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewCleanerProfile;
