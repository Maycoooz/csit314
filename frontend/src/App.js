import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
//-----------------------------------------------------------------------------------
import AdminAccountManagementPage from "./pages/AdminAccountManagementPage";
import AdminAMCreateAccountPage from "./pages/AdminAMCreateAccountPage";
import AdminAMViewAccountsPage from "./pages/AdminAMViewAccountsPage";
import AdminAMSearchAccountPage from "./pages/AdminAMSearchAccountPage";
import AdminAMSuspendAccountPage from "./pages/AdminAMSuspendAccountPage";
import AdminAMUpdateAccountPage from "./pages/AdminAMUpdateAccountPage";
//-----------------------------------------------------------------------------------
import AdminUserProfileManagementPage from "./pages/AdminUserProfileManagementPage";
import AdminUPMCreateUserProfilePage from "./pages/AdminUPMCreateUserProfilePage";
import AdminUPMViewUserProfilesPage from "./pages/AdminUPMViewUserProfilesPage";
import AdminUPMSearchUserProfilePage from "./pages/AdminUPMSearchUserProfilePage";
import AdminUPMSuspendUserProfilePage from "./pages/AdminUPMSuspendUserProfilePage";
import AdminUPMUpdateUserProfilePage from "./pages/AdminUPMUpdateUserProfilePage";
//-----------------------------------------------------------------------------------
import AdminRoleManagementPage from "./pages/AdminRoleManagementPage";
import AdminRMUpdateUserRolePage from "./pages/AdminRMUpdateUserRolePage";
import AdminRMViewUsersByRolePage from "./pages/AdminRMViewUsersByRolePage";
//-----------------------------------------------------------------------------------
import CleanerDashboardPage from "./pages/CleanerDashboardPage";                       


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                    <Route path="/admin-account-management" element={<AdminAccountManagementPage />} />
                        <Route path="/admin-am-create-account" element={<AdminAMCreateAccountPage />} />
                        <Route path="/admin-am-view-accounts" element={<AdminAMViewAccountsPage />} />
                        <Route path="/admin-am-search-account" element={<AdminAMSearchAccountPage />} />
                        <Route path="/admin-am-suspend-account" element={<AdminAMSuspendAccountPage />} />
                        <Route path="/admin-am-update-account" element={<AdminAMUpdateAccountPage />} />
                    <Route path="/admin-user-profile-management" element={<AdminUserProfileManagementPage />} />
                        <Route path="/admin-upm-create-userprofile" element={<AdminUPMCreateUserProfilePage />} />
                        <Route path="/admin-upm-view-userprofiles" element={<AdminUPMViewUserProfilesPage />} />
                        <Route path="/admin-upm-search-userprofile" element={<AdminUPMSearchUserProfilePage />} />
                        <Route path="/admin-upm-suspend-userprofile" element={<AdminUPMSuspendUserProfilePage />} />
                        <Route path="/admin-upm-update-userprofile" element={<AdminUPMUpdateUserProfilePage />} />
                    <Route path="/admin-role-management" element={<AdminRoleManagementPage />} />
                        <Route path="/admin-rm-update-user-role" element={<AdminRMUpdateUserRolePage />} />
                        <Route path="/admin-rm-view-users-by-role" element={<AdminRMViewUsersByRolePage />} />
                <Route path="/cleaner-dashboard" element={<CleanerDashboardPage />} />
                
            </Routes>
        </Router>
    );
}

export default App;
