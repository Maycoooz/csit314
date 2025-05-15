import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewAllUserProfiles } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/ViewAllUserProfiles.css";

const ViewAllUserProfiles = () => {
    const [userProfiles, setUserProfiles] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const profiles = await viewAllUserProfiles();
                setUserProfiles(profiles);
                setShowModal(true);
                document.body.classList.add("modal-open");
            } catch (err) {
                setError("Failed to load user profiles: " + err.message);
            }
        };

        fetchProfiles();
    }, []);

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
        navigate(-1);
    };

    return (
        <div className="view-profiles-container">

            {error && <p className="error-text">{error}</p>}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>All User Profiles</h2>
                        <table className="profile-table">
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userProfiles.map((profile, index) => (
                                    <tr key={index}>
                                        <td>{profile.role}</td>
                                        <td>{profile.description}</td>
                                        <td>{profile.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <button onClick={closeModal} className="back-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAllUserProfiles;
