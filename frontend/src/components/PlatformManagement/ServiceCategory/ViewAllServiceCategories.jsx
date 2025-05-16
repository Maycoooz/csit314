import React, { useEffect, useState } from "react";
import { viewAllServiceCategories } from "../../../services/serviceCategoryService";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlatformManagement/ServiceCategory/ViewAllServiceCategories.css";

const ViewServiceCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await viewAllServiceCategories();
                setCategories(data);
                setShowModal(true);
                document.body.classList.add("modal-open");
            } catch (err) {
                setError("❌ Failed to load service categories.");
            }
        };

        fetchData();
    }, []);

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
        navigate(-1);
    };

    return (
        <div className="view-category-container">
            {error && <p className="error-text">{error}</p>}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>All Service Categories</h2>
                        {categories.length > 0 ? (
                            <table className="category-table">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat, index) => (
                                        <tr key={index}>
                                            <td>{cat.category}</td>
                                            <td>{cat.description}</td>
                                            <td>{cat.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No categories found.</p>
                        )}
                        <br />
                        <button className="back-button" onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewServiceCategory;
