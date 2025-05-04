import React, { useEffect, useState } from "react";
import { getAllAccounts } from "../services/accountService";

const ViewAccounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        getAllAccounts()
            .then(setAccounts)
            .catch(err => alert(err.message));
    }, []);

    return (
        <div className="admin-page">
            <h2>All User Accounts</h2>
            <table>
                <thead>
                    <tr><th>Username</th><th>Status</th><th>Role</th></tr>
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
    );
};

export default ViewAccounts;
