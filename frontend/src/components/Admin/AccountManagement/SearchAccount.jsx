import React, { useState } from "react";
import { searchAccount } from "../../../services/accountService";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/AccountManagement/SearchAccount.css";

const SearchAccount = () => {
    const [username, setUsername] = useState("");
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setMessage("❌ Please enter a username to search.");
            setResults([]);
            setShowModal(false);
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        try {
            const res = await searchAccount(trimmedUsername);
            setResults(res);

            if (res.length === 0) {
                setMessage("❌ No user found with that username.");
                setShowModal(false);
                setTimeout(() => setMessage(""), 2000);
            } else {
                setMessage("");
                setShowModal(true);
                document.body.classList.add("modal-open");
            }
        } catch (err) {
            setMessage(err.message || "❌ Search failed.");
            setResults([]);
            setShowModal(false);
            setTimeout(() => setMessage(""), 2000);
        }

        setUsername("");
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("modal-open");
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
                {message && <p className="error-text">{message}</p>}
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            {/* Result Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Search Results</h3>
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
                        <br />
                        <button onClick={closeModal} className="back-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAccount;
