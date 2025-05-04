import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewAllUserProfiles } from "../services/userProfileService";

const ViewUserProfiles = () => {
    const [userProfiles, setUserProfiles] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const buttonStyle = {
        margin: "10px",
        padding: "12px 25px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "rgb(65, 129, 172)",
        color: "white",
        border: "none",
        cursor: "pointer"
    };

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
        <div style={{ paddingTop: "70px", textAlign: "center" }}>
            <h2>All User Profiles</h2>
            {error && <p>{error}</p>}
            <table style={{ margin: "20px auto", borderCollapse: "collapse", width: "80%" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Role</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {userProfiles.map((profile, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{profile.role}</td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{profile.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate(-1)} style={buttonStyle}>← Back</button>
        </div>
    );
};

export default ViewUserProfiles;
