import React, { useState, useEffect } from "react";
import { viewShortlist } from "../../../services/homeOwnerService";
import { useNavigate } from "react-router-dom";
import "../../../styles/HomeOwner/Shortlist/ViewShortlistHO.css";

const ViewShortlistHO = () => {
    const [shortlist, setShortlist] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const homeownerUsername = localStorage.getItem("username");

    useEffect(() => {
        const fetchShortlist = async () => {
            try {
                const data = await viewShortlist(homeownerUsername);
                setShortlist(data);
                setShowModal(true);
                document.body.classList.add("modal-open");
            } catch (err) {
                setShortlist([]);
                setError("❌ Failed to load shortlist.");
            }
        };

        fetchShortlist();
    }, [homeownerUsername]);

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
        navigate(-1);
    };

    return (
        <div className="shortlist-container">
            {error && <p className="error-text">{error}</p>}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>All Shortlisted Services</h2>
                        {shortlist.length > 0 ? (
                            <table className="shortlist-table">
                                <thead>
                                    <tr>
                                        <th>Cleaner</th>
                                        <th>Service ID</th>
                                        <th>Service</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shortlist.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.cleaner_username}</td>
                                            <td>{entry.service_id}</td>
                                            <td>{entry.service}</td>
                                            <td>{entry.category}</td>
                                            <td>${entry.price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="no-results">No shortlisted services found.</p>
                        )}
                        <br />
                        <button className="back-button" onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewShortlistHO;
