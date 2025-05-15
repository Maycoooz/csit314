import React from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/NavBar";

const LoginPage = () => {
    return (
        
        <div className="login-container">
            <Navbar />
            <LoginForm />
        </div>
    );
};

export default LoginPage;
