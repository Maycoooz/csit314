import React, { useState } from "react";
import { loginUser } from "../services/authService";
import "./LoginForm.css";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser({ username, password });
            setMessage(result.message);
        } catch (err) {
            setMessage(err.message || "Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input type="submit" value="Login" />
            <p className="response">{message}</p>
        </form>
    );
};

export default LoginForm;
