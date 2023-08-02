import React from "react";
import { InjectionZone } from "@strapi/helper-plugin";
import pluginId from "../pluginId";

const DefaultDashboard = () => {
  return (
    <div data-custom-dashboard>
      <InjectionZone area={`${pluginId}-dashboard-content`}></InjectionZone>
    </div>
  );
};

export default DefaultDashboard;
