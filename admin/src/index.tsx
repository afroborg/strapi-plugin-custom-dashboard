import React from "react";
import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginLoader from "./components/PluginLoader";

const pluginPath = `/plugins/${pluginId}/delete-me`;

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: true,
      name,
      injectionZones: {
        dashboard: {
          content: [],
        },
      },
    };

    app.registerPlugin(plugin);

    app.addMenuLink({
      to: pluginPath,
      icon: () => <PluginLoader pluginPath={pluginPath} />,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Plugin name",
      },
      Component: () => null,
    });
  },

  bootstrap(_app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
