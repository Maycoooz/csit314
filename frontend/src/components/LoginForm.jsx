import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getRoles, loginUser } from "../services/authService";
import "../styles/LoginForm.css";
import { useEffect } from "react"; // Add this if not already


const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");

    const navigate = useNavigate(); // Hook for redirect

    const openSuccessAlert = () => {
        setShowSuccessAlert(true);
    };
    
    const closeSuccessAlert = () => {
        setShowSuccessAlert(false);
    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                console.log("Roles fetched from backend:", data);
                setRoles(data);
                if (data.length > 0) {
                    setSelectedRole(data[0].role); // default
                }
            } catch (error) {
                console.error("Failed to fetch roles:", error);
            }
        };
    
        fetchRoles();
    }, []);
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const isSuccess = await loginUser({
                username: username,
                password: password,
                role: selectedRole 
            });
    
            if (isSuccess) {
                openSuccessAlert();
            
                setTimeout(() => {

                    closeSuccessAlert();
                    // Redirect based on selected role
                    if (selectedRole.toLowerCase() === "admin") {
                        navigate("/admin-dashboard");
                    } else if (selectedRole.toLowerCase() === "cleaner") {
                        navigate("/cleaner-dashboard");
                    } 
                }, 1500);

            } else {
            
            setMessage("Login failed. Please check your credentials.");
            setTimeout(() => {
                setMessage("");
            }, 3000); // Clear after 3 seconds
        }
    } catch (err) {
        
        setMessage("An error occurred. Please try again later.");
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }
};

return (
    <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
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
                <i className="fas fa-sign-in-alt" style={{textAlign: "center" }}></i>
                Login
            </button>

            <label htmlFor="role">Select Role:</label>

            <select id="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                {roles.map((r, index) => (
                    <option key={index} value={r.role}>
                        {r.role.charAt(0).toUpperCase() + r.role.slice(1)} – {r.description}
                    </option>
                ))}
            </select>


            <p className="selected-role-msg">
                Logging in as: <strong>{selectedRole}</strong>
            </p>

            <p className="response">{message}</p>

        </form>

        {/* Custom Success Alert Modal */}
        {showSuccessAlert && (
            <div className="custom-alert">
                <div className="custom-alert-content">
                    <h3>Login Successful</h3>
                    <p>Welcome <strong>{username}</strong>!</p>
                    <button onClick={closeSuccessAlert}>OK</button>
                </div>
            </div>
        )}
    </div>
);
};

export default LoginForm;
