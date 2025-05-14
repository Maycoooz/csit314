import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

//-----------------------------------------------------------------------------------
// Admin
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminAccountManagementPage from "./pages/Admin/AdminAccountManagementPage";
import AdminRoleManagementPage from "./pages/Admin/AdminRoleManagementPage";
import AdminUserProfileManagementPage from "./pages/Admin/AdminUserProfileManagementPage";

// Account Management Pages
import AdminCreateAccountPage from "./pages/Admin/AccountManagement/AdminCreateAccountPage";
import AdminViewAllAccountsPage from "./pages/Admin/AccountManagement/AdminViewAllAccountsPage"; 
import AdminSearchAccountPage from "./pages/Admin/AccountManagement/AdminSearchAccountPage";
import AdminSuspendAccountPage from "./pages/Admin/AccountManagement/AdminSuspendAccountPage";
import AdminUpdateAccountPage from "./pages/Admin/AccountManagement/AdminUpdateAccountPage";
//-----------------------------------------------------------------------------------
// User Profile Management Pages
import AdminCreateUserProfilePage from "./pages/Admin/UserProfileManagement/AdminCreateUserProfilePage";
import AdminViewAllUserProfilesPage from "./pages/Admin/UserProfileManagement/AdminViewAllUserProfilesPage";
import AdminSearchUserProfilePage from "./pages/Admin/UserProfileManagement/AdminSearchUserProfilePage";
import AdminSuspendUserProfilePage from "./pages/Admin/UserProfileManagement/AdminSuspendUserProfilePage";
import AdminUpdateUserProfilePage from "./pages/Admin/UserProfileManagement/AdminUpdateUserProfilePage";
//-----------------------------------------------------------------------------------
// Role Management Pages
import AdminUpdateUserRolePage from "./pages/Admin/RoleManagement/AdminUpdateUserRolePage";
import AdminViewUsersByRolePage from "./pages/Admin/RoleManagement/AdminViewUsersByRolePage";

//-----------------------------------------------------------------------------------
// Cleaner
import CleanerDashboardPage from "./pages/Cleaner/CleanerDashboardPage";   
import CleanerServiceManagementPage from "./pages/Cleaner/CleanerServiceManagementPage";
import CleanerStatisticsPage from "./pages/Cleaner/CleanerStatisticsPage";

// Cleaner Service Management Pages
import CleanerCreateServicePage from "./pages/Cleaner/ServiceManagement/CleanerCreateServicePage";        
import CleanerViewAllServicesPage from "./pages/Cleaner/ServiceManagement/CleanerViewAllServicesPage";                    
import CleanerSearchServicePage from "./pages/Cleaner/ServiceManagement/CleanerSearchServicePage";  
import CleanerUpdateServicePage from "./pages/Cleaner/ServiceManagement/CleanerUpdateServicePage";  
import CleanerSuspendServicePage from "./pages/Cleaner/ServiceManagement/CleanerSuspendServicePage";  

// Cleaner Statistics Pages
import CleanerNumberOfViewsPage from "./pages/Cleaner/Statistics/CleanerNumberOfViewsPage";
import CleanerViewShortlistPage from "./pages/Cleaner/Statistics/CleanerViewShortlistPage";
import CleanerSearchPastTransactionsPage from "./pages/Cleaner/Statistics/CleanerSearchPastTransactionsPage";
import CleanerViewPastTransactionsPage from "./pages/Cleaner/Statistics/CleanerViewPastTransactionsPage";

//-----------------------------------------------------------------------------------
// Home Owner
import HomeOwnerDashboardPage from "./pages/HomeOwnerDashboardPage";

import HomeOwnerViewCleanersPage from "./pages/HomeOwner/HomeOwnerViewCleanersPage";
import HomeOwnerViewShortlistPage from "./pages/HomeOwner/HomeOwnerViewShortlistPage";
import HomeOwnerViewCleanerProfilePage from "./pages/HomeOwner/HomeOwnerViewCleanerProfilePage";

//-----------------------------------------------------------------------------------
// PM
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
                <Route path="/Admin/Admin-Dashboard" element={<AdminDashboardPage />} />
                    <Route path="/Admin/AccountManagement" element={<AdminAccountManagementPage />} />
                        <Route path="/Admin/AccountManagement/CreateAccount" element={<AdminCreateAccountPage />} />
                        <Route path="/Admin/AccountManagement/ViewAllAccounts" element={<AdminViewAllAccountsPage />} />
                        <Route path="/Admin/AccountManagement/SearchAccount" element={<AdminSearchAccountPage />} />
                        <Route path="/Admin/AccountManagement/SuspendAccount" element={<AdminSuspendAccountPage />} />
                        <Route path="/Admin/AccountManagement/UpdateAccount" element={<AdminUpdateAccountPage />} />
                    <Route path="/Admin/UserProfileManagement" element={<AdminUserProfileManagementPage />} />
                        <Route path="/Admin/UserProfileManagement/CreateUserProfile" element={<AdminCreateUserProfilePage />} />
                        <Route path="/Admin/UserProfileManagement/ViewAllUserProfiles" element={<AdminViewAllUserProfilesPage />} />
                        <Route path="/Admin/UserProfileManagement/SearchUserProfile" element={<AdminSearchUserProfilePage />} />
                        <Route path="/Admin/UserProfileManagement/SuspendUserProfile" element={<AdminSuspendUserProfilePage />} />
                        <Route path="/Admin/UserProfileManagement/UpdateUserProfile" element={<AdminUpdateUserProfilePage />} />
                    <Route path="/Admin/RoleManagement" element={<AdminRoleManagementPage />} />
                        <Route path="/Admin/RoleManagement/UpdateUserRole" element={<AdminUpdateUserRolePage />} />
                        <Route path="/Admin/RoleManagement/ViewUsersByRole" element={<AdminViewUsersByRolePage />} />
                <Route path="/Cleaner/Cleaner-Dashboard" element={<CleanerDashboardPage />} />
                    <Route path="/Cleaner/ServiceManagement" element={<CleanerServiceManagementPage />} />
                        <Route path="/Cleaner/ServiceManagement/CreateService" element={<CleanerCreateServicePage />} />
                        <Route path="/Cleaner/ServiceManagement/ViewAllServices" element={<CleanerViewAllServicesPage />} />
                        <Route path="/Cleaner/ServiceManagement/SearchService" element={<CleanerSearchServicePage />} />
                        <Route path="/Cleaner/ServiceManagement/UpdateService" element={<CleanerUpdateServicePage />} />
                        <Route path="/Cleaner/ServiceManagement/SuspendService" element={<CleanerSuspendServicePage />} />
                    <Route path="/Cleaner/Statistics" element={<CleanerStatisticsPage />} />
                        <Route path="/Cleaner/Statistics/NumberOfViews" element={<CleanerNumberOfViewsPage />} />  
                        <Route path="/Cleaner/Statistics/ViewShortlist" element={<CleanerViewShortlistPage />} />
                        <Route path="/Cleaner/Statistics/SearchPastTransactions" element={<CleanerSearchPastTransactionsPage />} />
                        <Route path="/Cleaner/Statistics/ViewPastTransactions" element={<CleanerViewPastTransactionsPage />} />
                <Route path="/Home-Owner-Dashboard" element={<HomeOwnerDashboardPage />} />
                    <Route path="/HomeOwner/ViewCleaners" element={<HomeOwnerViewCleanersPage />} />
                    <Route path="/HomeOwner/ViewShortlist" element={<HomeOwnerViewShortlistPage />} />
                    <Route path="/HomeOwner/ViewCleanerProfile/:cleanerUsername" element={<HomeOwnerViewCleanerProfilePage />} />
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





