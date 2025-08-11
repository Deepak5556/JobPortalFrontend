import React from "react";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AllJobs from "./pages/AllJobs";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MyApplications from "./pages/MyApplications";

const NotFound = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-3xl font-bold text-blue-700">404 - Page Not Found</h1>
  </div>
);

const App = () => {
  return (
    <Router>
      {/* Only show Navbar if not on login/signup */}
      {/* You could use location.pathname or a layout route for more advanced visibility logic */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />  {/* Updated for clarity */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/jobs" element={<AllJobs />} />
        <Route path="/applications" element={<MyApplications />} />
        
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
