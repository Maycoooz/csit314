import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewAllUserProfiles } from "../../../services/userProfileService";
import "../../../styles/Admin/UserProfileManagement/ViewUserProfiles.css";

const ViewUserProfiles = () => {
    const [userProfiles, setUserProfiles] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const profiles = await viewAllUserProfiles();
                setUserProfiles(profiles);
            } catch (err) {
                setError("Failed to load user profiles: " + err.message);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div className="view-profiles-container">
            <div className="view-profiles-box">
                <h2>All User Profiles</h2>
                {error && <p className="error">{error}</p>}
                <table className="profile-table">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userProfiles.map((profile, index) => (
                            <tr key={index}>
                                <td>{profile.role}</td>
                                <td>{profile.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default ViewUserProfiles;
