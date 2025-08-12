import React from "react";
import { Link } from "react-router-dom";

// Example saved jobs data
const savedJobs = [
  {
    id: 1,
    title: "React Frontend Engineer",
    company: "NetCore",
    location: "Remote",
    salary: "₹11-18LPA",
    dateSaved: "2025-08-02",
    tags: ["React", "JavaScript", "Remote"],
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Designify",
    location: "Bangalore",
    salary: "₹8-14LPA",
    dateSaved: "2025-08-04",
    tags: ["Figma", "UI", "Full-Time"],
  },
];

const SavedJobs = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
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
              Deepak Kumar
            </h2>
            <p className="text-sm text-blue-700 mb-4">
              Frontend Developer | Job Seeker
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Link
              to="/profile"
              className="hover:bg-blue-50 px-4 py-2 rounded font-semibold text-blue-700"
            >
              My Profile
            </Link>
            <Link
              to="/applications"
              className="hover:bg-blue-50 px-4 py-2 rounded font-semibold text-blue-700"
            >
              My Applications
            </Link>
            <Link
              to="/saved"
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold"
            >
              Saved Jobs
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content: Saved Jobs */}
      <section className="col-span-1 md:col-span-3">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-8">Saved Jobs</h2>

          {/* Jobs grid for neat, card-based UI */}
          {savedJobs.length === 0 ? (
            <div className="text-gray-400 py-16 text-center text-base">No saved jobs found</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 flex flex-col shadow-sm hover:shadow-blue-100 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h4 className="text-xl font-bold text-blue-700">{job.title}</h4>
                    <span className="bg-blue-100 text-blue-800 font-semibold rounded px-3 py-1 text-sm">
                      {job.salary}
                    </span>
                  </div>
                  <div className="mt-1 text-gray-800 text-base font-medium">
                    {job.company}
                    <span className="ml-2 text-sm text-gray-500 font-normal">({job.location})</span>
                  </div>
                  <div className="flex flex-wrap gap-2 my-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mb-4">Saved on {job.dateSaved}</div>
                  <div className="flex flex-wrap gap-4 mt-auto">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold shadow transition text-base">
                      Apply
                    </button>
                    <button className="bg-gray-100 hover:bg-red-100 text-gray-700 px-6 py-2 rounded font-semibold shadow transition text-base">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  </div>
);

export default SavedJobs;
