import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import CleanerDashboardPage from "./pages/CleanerDashboardPage";
import AdminAccountManagementPage from "./pages/AdminAccountManagementPage";
import AdminAM_ViewAccountsPage from "./pages/AdminAM_ViewAccountsPage";
import AdminAM_SearchAccountsPage from "./pages/AdminAM_SearchAccountsPage";
import AdminUserProfileManagementPage from "./pages/AdminUserProfileManagementPage";
import AdminRoleManagementPage from "./pages/AdminRoleManagementPage";
import AdminAM_CreateAccountPage from "./pages/AdminAM_CreateAccountPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                <Route path="/cleaner-dashboard" element={<CleanerDashboardPage />} />
                <Route path="/admin-account-management" element={<AdminAccountManagementPage />} />
                <Route path="/admin-am-view-accounts" element={<AdminAM_ViewAccountsPage />} />
                <Route path="/admin-am-search-accounts" element={<AdminAM_SearchAccountsPage />} />
                <Route path="/admin-userprofile-management" element={<AdminUserProfileManagementPage />} />
                <Route path="/admin-role-management" element={<AdminRoleManagementPage />} />
                <Route path="/admin-am-create-account" element={<AdminAM_CreateAccountPage />} />
            </Routes>
        </Router>
    );
}

export default App;
