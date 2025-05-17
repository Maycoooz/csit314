import React from "react";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("username"); // will be null if not logged in
    return (
        <div className="page1">
            <Navbar />
            <section className="home-section">
                {/* Section 1: Text Left, Image Right */}
                <div className="section-container">
                    <div className="text-content">
                        <h2>Welcome to SCRUMSQUAD Cleaning Service</h2>
                        <p>
                            Find and book reliable freelance cleaners near you. Our platform connects homeowners with trusted cleaning professionals offering flexible and affordable services.
                        </p>
                        {!isLoggedIn && (
                            <button
                                className="login-btn"
                                role="button"
                                onClick={() => navigate("/login")}
                            >
                            Login
                            </button>
                        )}
                    </div>
                    <div className="image-content">
                        <img src="/images/cleaning_image.png" alt="Home Cleaning" className="home-image" />
                    </div>
                </div>

                {/* Section 2: Image Left, Text Right */}
                <div className="section-container reverse">
                    <div className="text-content">
                        <h2>About SCRUMSQUAD</h2>
                        <p>
                            We are committed to providing top-notch cleaning services tailored to your needs. From general tidying to deep cleans, our vetted cleaners ensure a spotless result every time.
                        </p>
                    </div>
                    <div className="image-content">
                        <img src="/images/cleaning_about.png" alt="About Us" className="home-image" />
                    </div>
                    
                </div>

                {/* Section 3: Customer Reviews */}
                <div className="reviews-section">
                    <h2>What Our Clients Say</h2>
                    <div className="reviews-container">
                        <div className="review-card">
                            <p className="stars">★★★★★</p>
                            <p>"Excellent service! The cleaner was punctual, professional, and my house looks amazing."</p>
                            <span className="reviewer">– Emily R.</span>
                        </div>
                        <div className="review-card">
                            <p className="stars">★★★★★</p>
                            <p>"Super easy to book and the results exceeded expectations. Will definitely use again!"</p>
                            <span className="reviewer">– Jason T.</span>
                        </div>
                        <div className="review-card">
                            <p className="stars">★★★★★</p>
                            <p>"Affordable, eco-friendly, and hassle-free. SCRUMSQUAD is now my go-to cleaning service."</p>
                            <span className="reviewer">– Priya K.</span>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default HomePage;
