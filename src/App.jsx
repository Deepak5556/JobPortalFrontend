import React from "react";
import { useLocation, BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AllJobs from "./pages/AllJobs";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/Saved";
import { ApplicationsProvider } from "../src/contexts/ApplicationsContext";
import JobSeekerProfileForm from "./pages/JobSeekerProfileForm";
import EmployerProfileForm from "./pages/EmployerProfileForm ";

const NotFound = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-3xl font-bold text-blue-700">404 - Page Not Found</h1>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  // Only show Navbar if not login or signup
  const hideNavbarPaths = ["/login", "/signup","/JobSeekerProfileForm", "/EmployerProfileForm"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<AllJobs />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved" element={<SavedJobs />} />
        <Route path="/JobSeekerProfileForm" element={<JobSeekerProfileForm />} />
        <Route path="/EmployerProfileForm" element={<EmployerProfileForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <ApplicationsProvider>
    <Router>
      <AppRoutes />
    </Router>
  </ApplicationsProvider>
);

export default App;
