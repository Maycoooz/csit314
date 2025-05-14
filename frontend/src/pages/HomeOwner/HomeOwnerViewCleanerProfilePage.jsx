import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ViewCleanerProfile from "../../components/HomeOwner/ViewCleanerProfile";
import Navbar from "../../components/NavBar";

const HomeOwnerViewCleanerProfilePage = () => {
    const navigate = useNavigate();
    const { cleanerUsername } = useParams();

    return (
        <div className="feature-page">
            <Navbar/>
            <button className="back-button" onClick={() => navigate("/homeowner/view-cleaners")}>
                ← Back
            </button>
            <h2>🧹 {cleanerUsername}'s Service Profile</h2>
            <ViewCleanerProfile cleanerUsername={cleanerUsername} />
        </div>
    );
};

export default HomeOwnerViewCleanerProfilePage;
