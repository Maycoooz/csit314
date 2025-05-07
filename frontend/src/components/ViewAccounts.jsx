import React, { useEffect, useState } from "react";
import { getAllAccounts } from "../services/accountService";
import { useNavigate } from "react-router-dom";
import "../styles/ViewAccounts.css";

const ViewAccounts = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);

    const buttonStyle = {
        margin: "10px",
        padding: "12px 25px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "rgb(65, 129, 172)",
        color: "white",
        border: "none",
        cursor: "pointer"
    };

    useEffect(() => {
        getAllAccounts()
            .then(setAccounts)
            .catch(err => alert(err.message));
    }, []);

    return (
        <div className="view-accounts-container">
            <div className="view-accounts-box">
                <h2>All User Accounts</h2>
                <table className="table-bordered">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Status</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.status}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={() => navigate(-1)} style={buttonStyle}>
                ← Back
            </button>
        </div>
    );
};

export default ViewAccounts;
