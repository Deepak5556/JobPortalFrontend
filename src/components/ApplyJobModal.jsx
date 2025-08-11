import React, { useState } from "react";
import Swal from "sweetalert2";

const ApplyJobModal = ({ open, onClose, job, jobSeekerProfile, onSubmit }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open || !job) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({
      jobListingId: job.jobListingId,
      jobSeekerProfileId: jobSeekerProfile.JobSeekerProfileId,
      coverLetter,
      status: "Pending",
    });
    setSubmitting(false);

    // Show SweetAlert and close modal after acknowledge
    Swal.fire({
      title: "Application Submitted!",
      text: "Your application has been submitted successfully.",
      icon: "success",
      confirmButtonColor: "#2563eb", // Tailwind blue-600
      confirmButtonText: "OK",
      customClass: { popup: "rounded-xl" },
    }).then(() => {
      setCoverLetter("");
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-blue-700">
          Apply for: {job.title}
        </h2>
        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Location:</span> {job.location}
        </p>
        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Company:</span> {job.company || "N/A"}
        </p>
        <p className="mb-4 text-sm text-blue-800">
          JobSeeker Profile:{" "}
          <span className="font-semibold">
            {jobSeekerProfile?.UserId || "ID"}
          </span>
        </p>
        <form onSubmit={handleFormSubmit}>
          <label className="block mb-2 font-semibold text-sm text-blue-700">
            Cover Letter *
            <textarea
              className="w-full border rounded p-2 mt-1 focus:outline-blue-400"
              rows={5}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
              disabled={submitting}
            />
          </label>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            Attach resume:{" "}
            <a
              href={jobSeekerProfile?.ResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 underline text-blue-600"
            >
              {jobSeekerProfile?.ResumeUrl ? "View Resume" : "Not Linked"}
            </a>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold py-2 transition"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobModal;
