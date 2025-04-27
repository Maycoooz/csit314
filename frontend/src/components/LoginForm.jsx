import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { loginUser } from "../services/authService"; // Assuming you have a login service
import "./LoginForm.css"; // or your style

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Hook for redirect

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await loginUser({
                username: username,
                password: password
            });

            setMessage(result.message || "Login successful!");

            // Redirect to dashboard if login successful
            navigate("/admin-dashboard");
        } catch (err) {
            setMessage(err.message || "Login failed.");
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

            <p>{message}</p>
        </form>
    );
};

export default LoginForm;
