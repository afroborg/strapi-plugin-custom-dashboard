# Custom Dashboard

This plugin adds an injection zone to the homepage of your Strapi admin panel (`/admin`.)

It enables injection of your own custom Component instead of the default.

## Installation

```bash
# with npm
npm i strapi-plugin-custom-dashboard
# or yarn
yarn add strapi-plugin-custom-dashboard
```

## Usage

This plugin by itself only removes the default dashboard and adds an injection zone. You'll have to create your own plugin to inject into the zone.

### Creating a plugin

```bash
# with npm
npm run strapi generate
# or yarn
yarn strapi generate
```

Then select `plugin` and give it a name. For this example we'll use `dashboard`.

> **Note**: if you select to use typescript, remember to cd into your plugin folder and run `yarn build` or `npm run build` before starting your strapi server.

### Registering the plugins

Open `./config/plugins.js` and add the following:

```js
module.exports = ({ env }) => ({
  // ...
  'custom-dashboard': {
    enabled: true,
  },
  // name of your own plugin
  'dashboard': {
    enabled: true,
    resolve: './src/plugins/dashboard' // replace dashboard with your plugin name
  },
  // ...
});
```

### Inject Component

In your own plugin, open the `./admin/src/index.[js|ts|jsx|tsx]` file and add the following:

```js
module.exports = {
    // ...

    bootstrap(app) {
        app.getPlugin("custom-dashboard").injectComponent("dashboard", "content", {
        name: "any-name",
        Component: Component, // the base component to inject
        });
  },
}

```
