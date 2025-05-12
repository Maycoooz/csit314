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





