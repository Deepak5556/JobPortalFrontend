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

// Add "company" field in each job for clarity
const mockJobListings = [
  {
    jobListingId: 1,
    employerProfileId: 11,
    company: "TechCorp",
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
    company: "DesignStudio",
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
    company: "InnovateX",
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

const formatCurrency = (amount) => "₹" + (amount / 100000).toFixed(1) + "LPA";

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
            <div key={job.jobListingId}
              className={`bg-white p-7 rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 ${job.status !== "Open" && "opacity-60 grayscale"}`}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-bold text-blue-700">{job.title}</h4>
                <span className="bg-blue-50 text-blue-700 font-medium rounded px-3 py-1 text-xs shadow">
                  {job.status}
                </span>
              </div>
              <div className="text-blue-600 font-semibold mb-1">{job.company}</div>
              <div className="text-gray-800 font-medium mb-1">{job.location}</div>
              <div className="text-xs text-blue-600 mb-2">{job.industry}</div>
              <div className="mb-2 text-base text-gray-700">{job.description}</div>
              <div className="mb-2 text-sm text-blue-800">
                <span className="font-semibold">Requirements: </span>{job.requirements}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {job.employmentType}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                  Posted: {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                  Salary: {formatCurrency(job.minSalary)} - {formatCurrency(job.maxSalary)}
                </span>
              </div>
              <div className="flex gap-3 mt-auto pt-2">
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setShowModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition disabled:opacity-60"
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
