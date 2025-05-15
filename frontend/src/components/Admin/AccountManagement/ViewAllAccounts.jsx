import React, { useEffect, useState } from "react";
import { getAllAccounts } from "../../../services/accountService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/AccountManagement/ViewAllAccounts.css";

const ViewAllAccounts = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        getAllAccounts()
            .then(setAccounts)
            .catch(err => alert(err.message));
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-box">
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

                <br />
                <button onClick={() => navigate(-1)} className="back-button">
                    Close
                </button>
            </div>
        </div>
    );
};

export default ViewAllAccounts;
