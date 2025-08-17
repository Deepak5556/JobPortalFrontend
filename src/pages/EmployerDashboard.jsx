import React from "react";
import Footer from "../components/Footer";

// Mock stats data
const mockStats = {
  jobsPosted: 12,
  applicationsReceived: 56,
  applicationsClosed: 8,
  jobSeekersApplied: 40,
};

const mockJobs = [
  {
    id: 1,
    title: "React Developer",
    applications: 15,
    status: "Open",
  },
  {
    id: 2,
    title: "Backend Engineer",
    applications: 10,
    status: "Closed",
  },
  {
    id: 3,
    title: "UI Designer",
    applications: 8,
    status: "Open",
  },
];

const data = localStorage.getItem("user");
const user = data ? JSON.parse(data) : null;

const EmployerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      {/* Main Layout */}
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <aside className="hidden md:block col-span-1 bg-white rounded-2xl shadow p-6 h-fit">
          <div className="flex flex-col items-center">
            <img
              src="https://deepakportfolioo.web.app/assets/deepak-DN2WtHp-.png"
              alt="Profile"
              className="w-24 h-24 rounded-full shadow mb-4 border-4 border-white"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {user?.username}
              </h2>
              <p className="text-sm text-blue-700 mb-4">{user?.role}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <a href="#" className="hover:bg-blue-50 px-4 py-2 rounded font-semibold text-blue-700">
                Dashboard
              </a>
              <a href="#" className="hover:bg-blue-50 px-4 py-2 rounded font-semibold text-blue-700">
                Posted Jobs
              </a>
              <a href="#" className="hover:bg-blue-50 px-4 py-2 rounded font-semibold text-blue-700">
                Applications
              </a>
              <a href="#" className="hover:bg-blue-50 px-4 py-2 rounded font-semibold text-blue-700">
                Settings
              </a>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Section */}
        <section className="col-span-1 md:col-span-3 flex flex-col gap-8">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg p-7">
            <h2 className="text-3xl font-bold mb-1">Welcome, {user?.username}!</h2>
            <p className="text-lg opacity-90">
              Manage your job postings and track applications effectively.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-sm text-gray-500">Jobs Posted</h3>
              <p className="text-2xl font-bold text-blue-700">{mockStats.jobsPosted}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-sm text-gray-500">Applications Received</h3>
              <p className="text-2xl font-bold text-blue-700">{mockStats.applicationsReceived}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-sm text-gray-500">Applications Closed</h3>
              <p className="text-2xl font-bold text-blue-700">{mockStats.applicationsClosed}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-sm text-gray-500">Job Seekers Applied</h3>
              <p className="text-2xl font-bold text-blue-700">{mockStats.jobSeekersApplied}</p>
            </div>
          </div>

          {/* Post Job Button */}
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow font-semibold">
              + Post Job
            </button>
          </div>

          {/* Recent Jobs Table */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Your Job Postings</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2">Job Title</th>
                  <th className="py-2">Applications</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-blue-50">
                    <td className="py-2 font-medium">{job.title}</td>
                    <td className="py-2">{job.applications}</td>
                    <td className={`py-2 font-semibold ${job.status === "Open" ? "text-green-600" : "text-red-600"}`}>
                      {job.status}
                    </td>
                    <td className="py-2">
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm font-semibold">
                        View
                      </button>
                      <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded text-sm font-semibold ml-2">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EmployerDashboard;
