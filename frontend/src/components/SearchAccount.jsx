import React, { useState } from "react";
import { searchAccount } from "../services/authService";

const SearchAccount = () => {
    const [username, setUsername] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const res = await searchAccount(username);
            setResults(res);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="admin-page">
            <h2>Search Account</h2>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {results.length > 0 && (
                <table>
                    <thead><tr><th>Username</th><th>Status</th><th>Role</th></tr></thead>
                    <tbody>
                        {results.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.status}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SearchAccount;
