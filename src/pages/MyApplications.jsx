import React from "react";

// Mock applied jobs data (replace with real API data or Context/Redux as needed)
const myApplications = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    status: "Pending",
    appliedDate: "2025-08-10",
  }
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Reviewed: "bg-blue-100 text-blue-800",
  Interviewing: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const MyApplications = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-14 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-8 text-center">My Applications</h1>
        {myApplications.length === 0 ? (
          <div className="text-gray-500 text-center py-20">No applications yet. Start applying to jobs!</div>
        ) : (
          <div className="space-y-4">
            {myApplications.map((app, idx) => (
              <div
                key={idx}
                className="w-full bg-white rounded-xl shadow flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 sm:p-6 border border-gray-100"
              >
                <div className="flex-1 text-left w-full">
                  <div className="text-blue-700 text-base sm:text-lg font-bold">{app.title}</div>
                  <div className="text-gray-700 mb-1 text-sm sm:text-base">
                    {app.company} &mdash; <span className="text-xs sm:text-sm">{app.location}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Applied on: {new Date(app.appliedDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow ${statusColors[app.status] || "bg-gray-200 text-gray-700"}`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
