import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import statesAndDistricts from "../api/StatesAndDistricts.js";

const JobSeekerProfileForm = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setPhotoPreview(null);
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) setResumeFile(file);
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!state || !district || !experienceYears || !resumeFile || !skills || !profilePhoto) {
      alert("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      // Upload profile photo
      const photoData = new FormData();
      photoData.append("file", profilePhoto);
      const photoRes = await axios.post(
        "http://localhost:5252/api/UploadProfilePhoto",
        photoData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const profilePhotoUrl = photoRes.data.url;

      // Upload resume PDF
      const resumeData = new FormData();
      resumeData.append("file", resumeFile);
      const resumeRes = await axios.post(
        "http://localhost:5252/api/UploadResume",
        resumeData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const resumeUrl = resumeRes.data.url;

      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        userId: user?.id || 0,
        location: `${district}, ${state}`,
        experienceYears: Number(experienceYears),
        resumeUrl,
        profilePhotoUrl,
        skills,
        savedJobIds: [],
      };

      await axios.post("http://localhost:5252/api/JobSeekerProfiles", payload);

      alert("Profile created successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white px-8 py-10 rounded-2xl shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Job Seeker Profile
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Fill out your profile to start applying for jobs.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Photo */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Profile Photo (JPG/PNG)
            </label>
            {photoPreview ? (
              <div className="relative w-32 h-32 mb-3">
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handlePhotoChange}
                className={`${inputClasses} file:mr-4 file:py-2 file:px-4 
                  file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                disabled={loading}
                required
              />
            )}
          </div>

          {/* State Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              State
            </label>
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setDistrict("");
              }}
              className={inputClasses}
              disabled={loading}
              required
            >
              <option value="">Select State</option>
              {Object.keys(statesAndDistricts).map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className={inputClasses}
              disabled={!state || loading}
              required
            >
              <option value="">Select District</option>
              {state &&
                statesAndDistricts[state]?.map((districtName) => (
                  <option key={districtName} value={districtName}>
                    {districtName}
                  </option>
                ))}
            </select>
          </div>

          {/* Experience Years */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Experience Years
            </label>
            <input
              type="number"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              placeholder="e.g., 3"
              className={inputClasses}
              disabled={loading}
              min="0"
              required
            />
          </div>

          {/* Resume */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload Resume (PDF only)
            </label>
            {resumeFile ? (
              <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg">
                <span className="text-sm text-gray-700">{resumeFile.name}</span>
                <button
                  type="button"
                  onClick={handleRemoveResume}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeChange}
                className={`${inputClasses} file:mr-4 file:py-2 file:px-4 
                  file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                disabled={loading}
                required
              />
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="JavaScript, React, Node.js"
              className={inputClasses}
              disabled={loading}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerProfileForm;
