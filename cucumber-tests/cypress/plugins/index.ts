/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const path = require('path');

const webpack = require('@cypress/webpack-preprocessor');
//@ts-ignore Cannot redeclare block-scoped variable 'path'.ts(2451)
//const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter');
//@ts-ignore Cannot redeclare block-scoped variable 'path'.ts(2451)
const configureQuarantine = require('cypress-quarantine/plugins/configure-quarantine')
  .default;
//@ts-ignore Cannot redeclare block-scoped variable 'path'.ts(2451)
const quarantineFile = path.resolve(__dirname, '../../quarantined-tests.json');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  

  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.js', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: [/node_modules/],
            use: [
              {
                loader: 'esbuild-loader',
                options: {
                  loader: 'ts',
                },
              },
            ],
          },
          {
            test: /\.feature$/,
            use: [
              {
                loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                options: config,
              },
            ],
          },
        ],
      },
    },
  };

  on('file:preprocessor', webpack(options));
  configureQuarantine(on, config, { quarantineFile: quarantineFile });
  return config;
}
