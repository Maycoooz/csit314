// src/pages/CleanerViewServicesPage.jsx
import React from "react";
import ViewServices from "../../../components/Cleaner/ServiceManagement/ViewAllServices";

const CleanerViewAllServicesPage = () => {
    return (
        <div>
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <ViewServices />
            </div>
        </div>
    );
};

export default CleanerViewAllServicesPage;
