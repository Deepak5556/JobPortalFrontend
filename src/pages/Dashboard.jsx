import React from "react";
import Footer from "../components/Footer";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    salary: "₹10-16LPA",
    tags: ["React", "JavaScript", "Remote"],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Bangalore",
    salary: "₹7-13LPA",
    tags: ["Figma", "UI/UX", "Full-time"],
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "InnovateX",
    location: "Delhi",
    salary: "₹11-18LPA",
    tags: ["Node.js", "API", "MongoDB"],
  },
];

const data = localStorage.getItem("user");
const user = data ? JSON.parse(data) : null;

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      {/* Fixed NavBar at the top */}
      {/* Main grid layout */}
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar (profile/shortcuts) */}
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
              <p className="text-sm text-blue-700 mb-4">
                {user?.role}
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <a
                href="#"
                className="hover:bg-blue-50 px-4 py-2 rounded font-semibold text-blue-700"
              >
                My Profile
              </a>
              <a
                href="#"
                className="hover:bg-blue-50 px-4 py-2 rounded font-semibold text-blue-700"
              >
                My Applications
              </a>
              <a
                href="#"
                className="hover:bg-blue-50 px-4 py-2 rounded font-semibold text-blue-700"
              >
                Saved Jobs
              </a>
              <a
                href="#"
                className="hover:bg-blue-50 px-4 py-2 rounded font-semibold text-blue-700"
              >
                Settings
              </a>
            </div>
          </div>
        </aside>

        {/* Central job feed */}
        <section className="col-span-1 md:col-span-2 flex flex-col gap-8">
          {/* Welcome banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg p-7 flex items-center relative overflow-hidden mb-3">
            <div>
              <h2 className="text-3xl font-bold mb-1">Welcome, {user?.username} !</h2>
              <p className="text-lg opacity-90">
                Your dashboard is live — Apply to new jobs, track applications,
                and grow your network.
              </p>
            </div>
          </div>
          {/* Latest Jobs */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">
              Recommended Jobs
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {mockJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-blue-200 hover:ring-4 hover:ring-blue-50 transition-all duration-300"
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold text-blue-700">
                        {job.title}
                      </h4>
                      <span className="bg-blue-50 text-blue-700 font-medium rounded px-3 py-1 text-sm">
                        {job.salary}
                      </span>
                    </div>
                    <div className="text-gray-800 text-base mb-1">
                      {job.company}{" "}
                      <span className="text-sm text-gray-400">
                        ({job.location})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 my-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:ml-2 shrink-0">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold shadow transition">
                      Apply
                    </button>
                    <button className="bg-yellow-100 hover:bg-yellow-300 text-yellow-800 px-5 py-2 rounded font-semibold shadow-md transition">
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right sidebar */}
        <aside className="hidden lg:block col-span-1 bg-white rounded-2xl shadow p-6 h-fit">
          <div className="mb-4">
            <h4 className="text-lg font-bold text-blue-700 mb-2">
              Career Tips
            </h4>
            <ul className="text-sm text-gray-600 list-disc pl-4 space-y-2">
              <li>Complete your profile to get personalized job matches.</li>
              <li>Follow companies to stay up to date with new openings.</li>
              <li>Network with recruiters for referrals.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-blue-700 mb-2">
              Quick Links
            </h4>
            <ul className="text-sm text-blue-700 list-none space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Top Companies
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Skill Assessments
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </main>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default Dashboard;
