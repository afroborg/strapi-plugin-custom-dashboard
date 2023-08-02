import React from "react";
import { useLocation } from "react-router-dom";

const App = React.lazy(() => import("../../app"));

type Props = {
  pluginPath: string;
};

const PluginLoader = ({ pluginPath }: Props) => {
  const location = useLocation();

  const css = `
  /* Hide the menu item from the left-hand menu */
  nav ul li li:has(a[href="/admin${pluginPath}"]) {
    display: none !important;
  }
`;

  return (
    <>
      <style>{css}</style>

      <React.Suspense fallback={null}>
        {location.pathname === "/" && <App />}
      </React.Suspense>
    </>
  );
};

export default PluginLoader;
