import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import statesAndDistricts from "../Data/StatesAndDistricts.js";

const EmployerProfileForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation for all fields
    if (!companyName.trim()) return setError("Company Name is required.");
    if (!industry.trim()) return setError("Industry is required.");
    if (!companyWebsite.trim()) return setError("Company Website is required.");
    if (!description.trim()) return setError("Description is required.");
    if (!state) return setError("State is required.");
    if (!district) return setError("District is required.");
    if (!logoFile) return setError("Company Logo is required.");

    try {
      setLoading(true);

      // Upload logo image
      const logoData = new FormData();
      logoData.append("file", logoFile);
      const logoRes = await axios.post(
        "http://localhost:5252/api/UploadCompanyLogo",
        logoData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const logoUrl = logoRes.data.url;

      // Get logged-in user
      const user = JSON.parse(localStorage.getItem("user"));

      // Payload for EmployerProfile
      const payload = {
        userId: user?.id || 0,
        companyName,
        industry,
        companyWebsite,
        description,
        logo: logoUrl,
        location: `${district}, ${state}`,
        jobListings: [],
      };

      await axios.post("http://localhost:5252/api/EmployerProfiles", payload);

      alert("Employer profile created successfully!");
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
          Employer Profile
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Fill out company details to start posting jobs.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Logo Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Company Logo (JPG/PNG)
            </label>
            {logoPreview ? (
              <div className="relative w-32 h-32 mb-3">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-full h-full object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleLogoChange}
                className={`${inputClasses} file:mr-4 file:py-2 file:px-4 
                  file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                disabled={loading}
              />
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className={inputClasses}
              disabled={loading}
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="IT, Healthcare, Finance..."
              className={inputClasses}
              disabled={loading}
            />
          </div>

          {/* Company Website */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Company Website
            </label>
            <input
              type="url"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="https://example.com"
              className={inputClasses}
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Company Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description about your company..."
              rows="4"
              className={inputClasses}
              disabled={loading}
            />
          </div>

          {/* State */}
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
            >
              <option value="">Select State</option>
              {Object.keys(statesAndDistricts).map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className={inputClasses}
              disabled={!state || loading}
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

          {/* Submit */}
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

export default EmployerProfileForm;
