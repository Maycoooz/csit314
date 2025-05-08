import React, { useEffect, useState } from "react";
import { getCleanerServices } from "../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../styles/ViewServices.css";

const ViewServices = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getCleanerServices(cleanerUsername);
                setServices(data);
            } catch (err) {
                setError("❌ Failed to load services.");
            }
        };

        fetchServices();
    }, [cleanerUsername]);

    return (
        <div className="view-services-container">
            <div className="view-services-box">
                <h2>Your Services</h2>
                {error && <p className="error-text">{error}</p>}

                {services.length > 0 ? (
                    <table className="services-table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, idx) => (
                                <tr key={idx}>
                                    <td>{service.service}</td>
                                    <td>{service.category}</td>
                                    <td>${service.price}</td>
                                    <td>{service.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !error && <p>No services found.</p>
                )}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewServices;
