import React, { useState } from "react";
import ApplyJobModal from "../components/ApplyJobModal";

// Example jobSeekerProfile
const jobSeekerProfile = {
  JobSeekerProfileId: 1001,
  UserId: 5678,
  Phone: 9876543210,
  Location: "Remote",
  ExperienceYears: 3,
  ResumeUrl: "https://example.com/resume.pdf",
  Skills: "React, Node.js, MongoDB",
  Applications: [],
};

// Your mock jobs (list)
const mockJobListings = [
  {
    jobListingId: 1,
    employerProfileId: 11,
    title: "Frontend Developer",
    description: "Develop modern UIs using React for scalable web apps.",
    requirements: "3+ years in React, good in JavaScript/HTML/CSS, team player.",
    location: "Remote",
    minSalary: 800000,
    maxSalary: 1600000,
    employmentType: "Full-time",
    industry: "Software",
    status: "Open",
    createdAt: "2025-08-01T09:00:00Z",
    applications: [],
  },
  {
    jobListingId: 2,
    employerProfileId: 12,
    title: "UI/UX Designer",
    description: "Craft user-focused designs for web and mobile platforms.",
    requirements: "Experience in Figma, Adobe XD. Strong portfolio.",
    location: "Bangalore",
    minSalary: 700000,
    maxSalary: 1300000,
    employmentType: "Contract",
    industry: "Design",
    status: "Open",
    createdAt: "2025-07-24T15:20:00Z",
    applications: [],
  },
  {
    jobListingId: 3,
    employerProfileId: 13,
    title: "Backend Developer",
    description: "Work on Node.js APIs and scalable backend logic.",
    requirements: "Strong with Node.js, REST API, MongoDB.",
    location: "Delhi",
    minSalary: 900000,
    maxSalary: 1800000,
    employmentType: "Full-time",
    industry: "Software",
    status: "Closed",
    createdAt: "2025-07-20T13:05:00Z",
    applications: [],
  }
];


const AllJobs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApply = async (applicationData) => {
    alert("Application submitted: " + JSON.stringify(applicationData, null, 2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto w-full px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-10 text-center tracking-tight">
          All Job Openings
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockJobListings.map((job) => (
            <div key={job.jobListingId} className="bg-white p-6 rounded-xl shadow flex flex-col">
              {/* ...other job info... */}
              <div className="flex gap-3 mt-auto pt-2">
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setShowModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
                  disabled={job.status !== "Open"}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>

        <ApplyJobModal
          open={showModal}
          onClose={() => { setShowModal(false); setSelectedJob(null); }}
          job={selectedJob}
          jobSeekerProfile={jobSeekerProfile}
          onSubmit={handleApply}
        />
      </div>
    </div>
  );
};

export default AllJobs;
