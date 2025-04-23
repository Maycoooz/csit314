import React from "react";
import Navbar from "../components/NavBar";

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h1>Welcome to C2C Cleaning Service</h1>
                <p>Find and book reliable freelance cleaners near you.</p>
            </div>
        </div>
    );
};

export default HomePage;
