import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import DefaultDashboard from "./default-dashboard";

const DashboardPortal = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>();

  const getRoot = () => {
    setTimeout(() => {
      const root = document.getElementById("main-content");
      if (!root) {
        getRoot();
        return;
      }

      setRef(root);
      setIsLoading(false);
    }, 10);
  };

  useEffect(() => {
    setIsLoading(true);
    getRoot();
  }, []);

  if (!ref) {
    return null;
  }

  return createPortal(<DefaultDashboard />, ref);
};

const App = () => {
  const css = `
/* Hide the default dashboard stuff */
  #main-content > div:not([data-custom-dashboard]) {
    display: none !important;
  }
`;

  return (
    <div>
      <style>{css}</style>

      <DashboardPortal />
    </div>
  );
};

export default App;
