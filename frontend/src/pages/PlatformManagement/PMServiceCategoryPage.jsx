import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const PMServiceCategoryPage = () => {
    const navigate = useNavigate();

    const buttonStyle = {
        margin: "10px",
        padding: "15px 30px",
        fontSize: "18px",
        cursor: "pointer",
        borderRadius: "8px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none"
    };

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h1>Service Category Management</h1>
                <p>Select an action:</p>
                <div>
                    <button onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}> 
                        ← Back
                    </button>
                    <button onClick={() => navigate("/PlatformManagement/ServiceCategory/CreateServiceCategory")} style={buttonStyle}>
                        Create Category
                    </button>
                    <button onClick={() => navigate("/PlatformManagement/ServiceCategory/ViewAllServiceCategories")} style={buttonStyle}>
                        View All Categories
                    </button>
                    <button onClick={() => navigate("/PlatformManagement/ServiceCategory/UpdateServiceCategory")} style={buttonStyle}>
                        Update Category
                    </button>
                    <button onClick={() => navigate("/PlatformManagement/ServiceCategory/SuspendServiceCategory")} style={buttonStyle}>
                        Suspend Category
                    </button>
                    <button onClick={() => navigate("/PlatformManagement/ServiceCategory/SearchServiceCategory")} style={buttonStyle}>
                        Search Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PMServiceCategoryPage;
