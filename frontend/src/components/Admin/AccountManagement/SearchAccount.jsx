import React, { useState } from "react";
import { searchAccount } from "../../../services/accountService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/AccountManagement/SearchAccount.css";

const SearchAccount = () => {
    const [username, setUsername] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const [message, setMessage] = useState(""); // add this to state

    const handleSearch = async () => {
        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setMessage("❌ Please enter a username to search.");
            setResults([]);
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        try {
            const res = await searchAccount(trimmedUsername);
            setResults(res);

            if (res.length === 0) {
                setMessage("❌ No user found with that username.");
                setTimeout(() => setMessage(""), 2000);
            } else {
                setMessage(""); // clear previous messages if user is found
            }
        } catch (err) {
            setMessage(err.message || "❌ Search failed.");
            setResults([]);
            setTimeout(() => setMessage(""), 2000);
        }
    };


    return (
        <div className="search-account-container">
            <div className="search-account-box">
                <h2>Search Account</h2>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                {message && <p>{message}</p>}

                {results.length > 0 && (
                    <table className="table-bordered">
                        <thead>
                            <tr><th>Username</th><th>Status</th><th>Role</th></tr>
                        </thead>
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

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default SearchAccount;
