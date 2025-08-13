import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const defaultApps = [
  {
    id: 1,
    position: "Frontend Developer",
    company: "Acme Corp",
    status: "Interview Scheduled",
    appliedDate: "2025-08-01",
  },
  {
    id: 2,
    position: "Backend Engineer",
    company: "Initech",
    status: "Applied",
    appliedDate: "2025-08-04",
  },
];

const Profile = () => {
  const profilePhotoRef = useRef();
  const resumeRef = useRef();
  const navigate = useNavigate();

  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [editSkills, setEditSkills] = useState(false);

  const [photo, setPhoto] = useState("/path/to/profile-photo.jpg");
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("+91 9876543210");
  const [location, setLocation] = useState("Bangalore, India");
  const [experience, setExperience] = useState(3);
  const [role, setRole] = useState("Software Engineer");
  const [resumeUrl, setResumeUrl] = useState("https://resume-link.com");
  const [skills, setSkills] = useState("C#, ASP.NET, SQL, TailwindCSS");
  const [applications, setApplications] = useState(defaultApps);

  // Load user from localStorage
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        const jsonData = JSON.parse(data);
        console.log("Logged in user:", jsonData.username);
        if (jsonData.username) setName(jsonData.username);
        if (jsonData.phoneNumber) setPhone(jsonData.phoneNumber);
        if (jsonData.location) setLocation(jsonData.location);
        if (jsonData.role) setRole(jsonData.role);
        console.log(jsonData.phone);
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    } else {
      console.log("No user data found in localStorage");
    }
  }, []);

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const skillsList = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleLogout = () => {
    const ok = window.confirm("Are you sure you want to log out?");
    if (!ok) return;

    try {
      localStorage.removeItem("user");
      sessionStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      {/* Top Bar */}
      <header className="w-full bg-white/70 backdrop-blur border-b border-blue-100">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-blue-900">
            Job Portal
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block col-span-1 bg-white rounded-2xl shadow p-6 h-fit">
          <div className="flex flex-col items-center">
            <div className="relative group mb-3">
              <img
                src={photo}
                alt="Profile"
                className="w-24 h-24 rounded-full shadow border-4 border-white object-cover"
              />
              <button
                type="button"
                onClick={() => profilePhotoRef.current.click()}
                className="absolute bottom-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow"
                aria-label="Edit Profile Photo"
                style={{ zIndex: 1 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 6l-1.5-1.5a1 1 0 00-.7-.3h-2.6a1 1 0 00-.7.3L9 6H6.5A1.5 1.5 0 005 7.5v9A1.5 1.5 0 006.5 18h11a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0017.5 6H15z"
                  />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </button>
              <input
                type="file"
                ref={profilePhotoRef}
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>

            {/* Name */}
            <div className="text-center mb-2">
              {!editName ? (
                <>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    {name}
                  </h2>
                  <button
                    onClick={() => setEditName(true)}
                    className="text-blue-600 hover:text-blue-800 p-1 ml-1"
                    aria-label="Edit Name"
                  >
                    ✏️
                  </button>
                </>
              ) : (
                <div className="flex items-center">
                  <input
                    className="border-b border-blue-200 px-2 py-1 focus:outline-none mr-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={() => setEditName(false)}
                    className="px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              )}
              <p className="text-sm text-blue-700">{role}</p>
            </div>

            {/* Shortcuts */}
            <div className="flex flex-col gap-2 w-full mt-2">
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

        {/* Main Content */}
        <section className="col-span-1 md:col-span-3 flex flex-col gap-8">
          {/* Profile Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Profile Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Phone */}
              <div>
                <span className="font-semibold text-gray-600">Phone:</span>
                {!editPhone ? (
                  <>
                    <span className="ml-2">{phone}</span>
                    <button
                      onClick={() => setEditPhone(true)}
                      className="text-blue-600 hover:text-blue-800 p-1 ml-1"
                    >
                      ✏️
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      className="border-b border-blue-200 px-2 py-1 focus:outline-none ml-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoFocus
                    />
                    <setting
                      onClick={() => setEditPhone(false)}
                      className="ml-2 px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Save
                    </setting>
                  </>
                )}
              </div>

              {/* Location */}
              <div>
                <span className="font-semibold text-gray-600">Location:</span>
                {!editLocation ? (
                  <>
                    <span className="ml-2">{location}</span>
                    <button
                      onClick={() => setEditLocation(true)}
                      className="text-blue-600 hover:text-blue-800 p-1 ml-1"
                    >
                      ✏️
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      className="border-b border-blue-200 px-2 py-1 focus:outline-none ml-2"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      autoFocus
                    />
                    <button
                      onClick={() => setEditLocation(false)}
                      className="ml-2 px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>

              {/* Experience */}
              <div>
                <span className="font-semibold text-gray-600">
                  Experience (years):
                </span>
                {!editExperience ? (
                  <>
                    <span className="ml-2">{experience}</span>
                    <button
                      onClick={() => setEditExperience(true)}
                      className="text-blue-600 hover:text-blue-800 p-1 ml-1"
                    >
                      ✏️
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="number"
                      min={0}
                      className="border-b border-blue-200 px-2 py-1 w-20 focus:outline-none ml-2"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      autoFocus
                    />
                    <button
                      onClick={() => setEditExperience(false)}
                      className="ml-2 px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>

              {/* Resume */}
              <div>
                <span className="font-semibold text-gray-600">Resume:</span>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline ml-2"
                >
                  View Resume
                </a>
                <button
                  type="button"
                  onClick={() => resumeRef.current.click()}
                  className="ml-2 px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded text-sm font-medium text-blue-700 border shadow focus:outline-none"
                >
                  Update
                </button>
                <input
                  type="file"
                  ref={resumeRef}
                  className="hidden"
                  aria-label="Upload resume"
                />
              </div>

              {/* Skills */}
              <div className="col-span-1 md:col-span-2">
                <span className="font-semibold text-gray-600">Skills:</span>
                {!editSkills ? (
                  <>
                    <div className="inline-flex flex-wrap gap-2 ml-2">
                      {skillsList.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setEditSkills(true)}
                      className="text-blue-600 hover:text-blue-800 p-1 ml-2"
                    >
                      ✏️
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      className="border-b border-blue-200 px-2 py-1 w-64 focus:outline-none ml-2"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      autoFocus
                    />
                    <button
                      onClick={() => setEditSkills(false)}
                      className="ml-2 px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-5">
              My Applications
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-blue-100 rounded-lg bg-white text-[#29366f] text-lg shadow-sm">
                <thead className="bg-blue-50 text-blue-800">
                  <tr>
                    <th className="py-3 px-6 text-left font-semibold">
                      Position
                    </th>
                    <th className="py-3 px-6 text-left font-semibold">
                      Company
                    </th>
                    <th className="py-3 px-6 text-left font-semibold">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left font-semibold">
                      Applied Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-gray-400"
                      >
                        No job applications yet
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b border-blue-50 hover:bg-blue-50"
                      >
                        <td className="py-3 px-6">{app.position}</td>
                        <td className="py-3 px-6">{app.company}</td>
                        <td className="py-3 px-6">{app.status}</td>
                        <td className="py-3 px-6">{app.appliedDate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
