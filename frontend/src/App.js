import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import CleanerDashboardPage from "./pages/CleanerDashboardPage";
import CreateAccountPage from "./pages/CreateAccountPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                <Route path="/cleaner-dashboard" element={<CleanerDashboardPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
            </Routes>
        </Router>
    );
}

export default App;
