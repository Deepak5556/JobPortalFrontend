import React, { createContext, useContext, useState } from "react";

const ApplicationsContext = createContext();

export function useApplications() {
  return useContext(ApplicationsContext);
}

export function ApplicationsProvider({ children }) {
  const [applied, setApplied] = useState([]);

  const applyToJob = (job) => {
    // Don't duplicate
    if (!applied.some((app) => app.id === job.id)) {
      setApplied([
        ...applied,
        {
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          status: "Pending",
          appliedDate: new Date().toISOString(),
        },
      ]);
    }
  };

  return (
    <ApplicationsContext.Provider value={{ applied, applyToJob }}>
      {children}
    </ApplicationsContext.Provider>
  );
}
