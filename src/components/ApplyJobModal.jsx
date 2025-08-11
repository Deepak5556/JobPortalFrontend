    import React, { useState } from "react";

// Props:
// - open: boolean, controls visibility
// - onClose: function to close modal
// - job: job object user is applying to
// - jobSeekerProfile: job seeker profile object (from backend/api or props)
// - onSubmit: async function to handle actual apply (formData) for integration
const ApplyJobModal = ({
  open,
  onClose,
  job,
  jobSeekerProfile,
  onSubmit
}) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open || !job) return null;

  // Example Application object for API:
  // { jobListingId: job.jobListingId, jobSeekerProfileId: jobSeekerProfile.JobSeekerProfileId, coverLetter, status: "Pending" }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({
      jobListingId: job.jobListingId,
      jobSeekerProfileId: jobSeekerProfile.JobSeekerProfileId,
      coverLetter,
      status: "Pending"
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  // Simple modal style, highly customizable:
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
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
          JobSeeker Profile: <span className="font-semibold">{jobSeekerProfile?.UserId || "ID"}</span>
        </p>
        <form onSubmit={handleFormSubmit}>
          <label className="block mb-2 font-semibold text-sm text-blue-700">
            Cover Letter *
            <textarea
              className="w-full border rounded p-2 mt-1 focus:outline-blue-400"
              rows={5}
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
              required
              disabled={submitting || submitted}
            />
          </label>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            Attach resume: <a href={jobSeekerProfile?.ResumeUrl} target="_blank" rel="noopener noreferrer" className="ml-1 underline text-blue-600">
              {jobSeekerProfile?.ResumeUrl ? "View Resume" : "Not Linked"}
            </a>
          </div>
          {/* You may add a file upload input if you want to support upload */}
          <button
            type="submit"
            disabled={submitting || submitted}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold py-2 transition"
          >
            {submitting ? 'Submitting...' : submitted ? 'Application Submitted!' : 'Submit Application'}
          </button>
        </form>
        {submitted && (
          <p className="mt-4 text-green-600 text-center font-bold">
            Your application has been submitted!
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplyJobModal;
