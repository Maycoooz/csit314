import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
//-----------------------------------------------------------------------------------
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminAccountManagementPage from "./pages/Admin/AdminAccountManagementPage";
import AdminRoleManagementPage from "./pages/Admin/AdminRoleManagementPage";
import AdminUserProfileManagementPage from "./pages/Admin/AdminUserProfileManagementPage";
//-----------------------------------------------------------------------------------
// Account Management Pages
import AdminAMCreateAccountPage from "./pages/Admin/AccountManagement/AdminAMCreateAccountPage";
import AdminAMViewAllAccountsPage from "./pages/Admin/AccountManagement/AdminAMViewAllAccountsPage"; 
import AdminAMSearchAccountPage from "./pages/Admin/AccountManagement/AdminAMSearchAccountPage";
import AdminAMSuspendAccountPage from "./pages/Admin/AccountManagement/AdminAMSuspendAccountPage";
import AdminAMUpdateAccountPage from "./pages/Admin/AccountManagement/AdminAMUpdateAccountPage";
//-----------------------------------------------------------------------------------
// User Profile Management Pages
import AdminUPMCreateUserProfilePage from "./pages/Admin/UserProfileManagement/AdminUPMCreateUserProfilePage";
import AdminUPMViewUserProfilesPage from "./pages/Admin/UserProfileManagement/AdminUPMViewUserProfilesPage";
import AdminUPMSearchUserProfilePage from "./pages/Admin/UserProfileManagement/AdminUPMSearchUserProfilePage";
import AdminUPMSuspendUserProfilePage from "./pages/Admin/UserProfileManagement/AdminUPMSuspendUserProfilePage";
import AdminUPMUpdateUserProfilePage from "./pages/Admin/UserProfileManagement/AdminUPMUpdateUserProfilePage";
//-----------------------------------------------------------------------------------
// Role Management Pages
import AdminRMUpdateUserRolePage from "./pages/Admin/RoleManagement/AdminRMUpdateUserRolePage";
import AdminRMViewUsersByRolePage from "./pages/Admin/RoleManagement/AdminRMViewUsersByRolePage";
//-----------------------------------------------------------------------------------
import CleanerDashboardPage from "./pages/CleanerDashboardPage";    
import CleanerCreateServicePage from "./pages/CleanerCreateServicePage";        
import CleanerViewServicesPage from "./pages/CleanerViewServicesPage";                    
import CleanerSearchServicePage from "./pages/CleanerSearchServicePage";  
import CleanerUpdateServicePage from "./pages/CleanerUpdateServicePage";  
import CleanerSuspendServicePage from "./pages/CleanerSuspendServicePage";  
import CleanerViewStatsPage from "./pages/CleanerViewStatsPage";
//-----------------------------------------------------------------------------------
import HomeOwnerDashboardPage from "./pages/HomeOwnerDashboardPage";
import HomeOwnerViewCleanersPage from "./pages/HomeOwnerViewCleanersPage";
import HomeOwnerViewShortlistPage from "./pages/HomeOwnerViewShortlistPage";
import HomeOwnerViewCleanerProfilePage from "./pages/HomeOwnerViewCleanerProfilePage";
//-----------------------------------------------------------------------------------
import PlatformManagementDashboardPage from "./pages/PlatformManagement/PlatformManagementDashboardPage";
import PlatformManagementServiceCategoryPage from "./pages/PlatformManagement/PMServiceCategoryPage";
import PlatformManagementReportPage from "./pages/PlatformManagement/PMReportPage";

// Service Category Pages
import PMCreateServiceCategoryPage from "./pages/PlatformManagement/ServiceCategory/PMCreateServiceCategoryPage";
import PMViewAllServiceCategoriesPage from "./pages/PlatformManagement/ServiceCategory/PMViewAllServiceCategoriesPage";
import PMUpdateServiceCategoryPage from "./pages/PlatformManagement/ServiceCategory/PMUpdateServiceCategoryPage";
import PMSuspendServiceCategoryPage from "./pages/PlatformManagement/ServiceCategory/PMSuspendServiceCategoryPage";
import PMSearchServiceCategoryPage from "./pages/PlatformManagement/ServiceCategory/PMSearchServiceCategoryPage";

// Report Pages
import PMViewDailyReportPage from "./pages/PlatformManagement/Report/PMViewDailyReportPage";
import PMViewWeeklyReportPage from "./pages/PlatformManagement/Report/PMViewWeeklyReportPage";
import PMViewMonthlyReportPage from "./pages/PlatformManagement/Report/PMViewMonthlyReportPage";
//-----------------------------------------------------------------------------------


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                    <Route path="/Admin/AccountManagement" element={<AdminAccountManagementPage />} />
                        <Route path="/Admin/AccountManagement/CreateAccount" element={<AdminAMCreateAccountPage />} />
                        <Route path="/Admin/AccountManagement/ViewAllAccounts" element={<AdminAMViewAllAccountsPage />} />
                        <Route path="/Admin/AccountManagement/SearchAccount" element={<AdminAMSearchAccountPage />} />
                        <Route path="/Admin/AccountManagement/SuspendAccount" element={<AdminAMSuspendAccountPage />} />
                        <Route path="/Admin/AccountManagement/UpdateAccount" element={<AdminAMUpdateAccountPage />} />
                    <Route path="/Admin/UserProfileManagement" element={<AdminUserProfileManagementPage />} />
                        <Route path="/admin-upm-create-userprofile" element={<AdminUPMCreateUserProfilePage />} />
                        <Route path="/admin-upm-view-userprofiles" element={<AdminUPMViewUserProfilesPage />} />
                        <Route path="/admin-upm-search-userprofile" element={<AdminUPMSearchUserProfilePage />} />
                        <Route path="/admin-upm-suspend-userprofile" element={<AdminUPMSuspendUserProfilePage />} />
                        <Route path="/admin-upm-update-userprofile" element={<AdminUPMUpdateUserProfilePage />} />
                    <Route path="/Admin/RoleManagement" element={<AdminRoleManagementPage />} />
                        <Route path="/Admin/RoleManagement/UpdateUserRole" element={<AdminRMUpdateUserRolePage />} />
                        <Route path="/Admin/RoleManagement/ViewUsersByRole" element={<AdminRMViewUsersByRolePage />} />
                <Route path="/cleaner-dashboard" element={<CleanerDashboardPage />} />
                    <Route path="/cleaner-create-service" element={<CleanerCreateServicePage />} />
                    <Route path="/cleaner-view-services" element={<CleanerViewServicesPage />} />
                    <Route path="/cleaner-search-service" element={<CleanerSearchServicePage />} />
                    <Route path="/cleaner-update-service" element={<CleanerUpdateServicePage />} />
                    <Route path="/cleaner-suspend-service" element={<CleanerSuspendServicePage />} />
                    <Route path="/cleaner-view-stats" element={<CleanerViewStatsPage />} />   
                <Route path="/home-owner-dashboard" element={<HomeOwnerDashboardPage />} />
                    <Route path="/home-owner-view-cleaners" element={<HomeOwnerViewCleanersPage />} />
                    <Route path="/home-owner-view-shortlist-cleaners" element={<HomeOwnerViewShortlistPage />} />
                    <Route path="/homeowner/view-cleaner-profile/:cleanerUsername" element={<HomeOwnerViewCleanerProfilePage />} />
                <Route path="/PlatformManagement/Platform-Management-Dashboard" element={<PlatformManagementDashboardPage />} />
                    <Route path="/PlatformManagement/ServiceCategory" element={<PlatformManagementServiceCategoryPage />} />
                        <Route path="/PlatformManagement/ServiceCategory/CreateServiceCategory" element={<PMCreateServiceCategoryPage />} />
                        <Route path="/PlatformManagement/ServiceCategory/ViewAllServiceCategories" element={<PMViewAllServiceCategoriesPage />} />
                        <Route path="/PlatformManagement/ServiceCategory/UpdateServiceCategory" element={<PMUpdateServiceCategoryPage />} />
                        <Route path="/PlatformManagement/ServiceCategory/SuspendServiceCategory" element={<PMSuspendServiceCategoryPage />} />
                        <Route path="/PlatformManagement/ServiceCategory/SearchServiceCategory" element={<PMSearchServiceCategoryPage />} />
                    <Route path="/PlatformManagement/Report" element={<PlatformManagementReportPage />} />
                        <Route path="/PlatformManagement/Report/ViewDailyReport" element={<PMViewDailyReportPage />} />
                        <Route path="/PlatformManagement/Report/ViewWeeklyReport" element={<PMViewWeeklyReportPage />} />
                        <Route path="/PlatformManagement/Report/ViewMonthlyReport" element={<PMViewMonthlyReportPage />} />
            </Routes>
        </Router>
    );
}

export default App;





