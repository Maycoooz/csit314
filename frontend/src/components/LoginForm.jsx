import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { loginUser } from "../services/authService"; // Assuming you have a login service
import "./LoginForm.css"; // or your style

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"
    const navigate = useNavigate(); // Hook for redirect

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const isSuccess = await loginUser({
                username: username,
                password: password
            });
    
            if (isSuccess) {
                setMessageType("success");
                setMessage("Login successful!");
                
                // Wait 2 seconds before redirecting
                setTimeout(() => {
                    navigate("/admin-dashboard");
                }, 2000); // 2000ms = 2 seconds

            } else {
            setMessageType("error");
            setMessage("Login failed. Please check your credentials.");
            setTimeout(() => {
                setMessage("");
            }, 3000); // Clear after 3 seconds
        }
    } catch (err) {
        setMessageType("error");
        setMessage("An error occurred. Please try again later.");
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }
};

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Admin Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">
                <i className="fas fa-sign-in-alt" style={{ marginRight: "8px" }}></i>
                Login
            </button>

            <p className={`response ${messageType}`}>{message}</p>
        </form>
    );
};

export default LoginForm;
