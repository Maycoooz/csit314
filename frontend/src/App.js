import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import CleanerDashboardPage from "./pages/CleanerDashboardPage";
import AdminAccountManagementPage from "./pages/AdminAccountManagementPage";
import AdminAMCreateAccountPage from "./pages/AdminAMCreateAccountPage";
import AdminAMViewAccountPage from "./pages/AdminAMViewAccountPage";
import AdminAMSearchAccountPage from "./pages/AdminAMSearchAccountPage";
import AdminAMSuspendAccountPage from "./pages/AdminAMSuspendAccountPage";
import AdminAMUpdateAccountPage from "./pages/AdminAMUpdateAccountPage";
import AdminUserProfileManagementPage from "./pages/AdminUserProfileManagementPage";
import AdminRoleManagementPage from "./pages/AdminRoleManagementPage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                <Route path="/cleaner-dashboard" element={<CleanerDashboardPage />} />
                <Route path="/admin-account-management" element={<AdminAccountManagementPage />} />
                <Route path="/admin-am-create-account" element={<AdminAMCreateAccountPage />} />
                <Route path="/admin-am-view-account" element={<AdminAMViewAccountPage />} />
                <Route path="/admin-am-search-account" element={<AdminAMSearchAccountPage />} />
                <Route path="/admin-am-suspend-account" element={<AdminAMSuspendAccountPage />} />
                <Route path="/admin-am-update-account" element={<AdminAMUpdateAccountPage />} />
                <Route path="/admin-userprofile-management" element={<AdminUserProfileManagementPage />} />
                <Route path="/admin-role-management" element={<AdminRoleManagementPage />} />
                
            </Routes>
        </Router>
    );
}

export default App;
