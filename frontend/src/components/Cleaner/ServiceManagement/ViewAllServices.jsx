import React, { useEffect, useState } from "react";
import { getCleanerServices } from "../../../services/cleanerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Cleaner/ServiceManagement/ViewAllServices.css";

const ViewAllServices = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const cleanerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getCleanerServices(cleanerUsername);
                setServices(data);
                setShowModal(true);
                document.body.classList.add("modal-open");
            } catch (err) {
                setError("❌ Failed to load services.");
            }
        };

        if (cleanerUsername) {
            fetchServices();
        }
    }, [cleanerUsername]);

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
        navigate(-1);
    };

    return (
        <div className="view-services-container">
            {error && <p className="error-text">{error}</p>}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Your Services</h2>
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
                                            <td>${parseFloat(service.price).toFixed(2)}</td>
                                            <td>{service.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No services found.</p>
                        )}
                        <br />
                        <button onClick={closeModal} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAllServices;
