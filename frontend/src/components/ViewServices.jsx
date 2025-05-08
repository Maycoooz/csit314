// src/components/ViewServices.jsx
import React, { useEffect, useState } from "react";
import { getCleanerServices } from "../services/cleanerService";

const ViewServices = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState("");

    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getCleanerServices({ cleaner_username: cleanerUsername });
                setServices(data);
            } catch (err) {
                setError("Failed to load services.");
            }
        };

        fetchServices();
    }, [cleanerUsername]);

    return (
        <div style={{ marginTop: "20px" }}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {services.length > 0 ? (
                <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}>
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
    );
};

export default ViewServices;
