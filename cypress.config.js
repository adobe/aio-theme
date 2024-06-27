const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 900,
  viewportWidth: 1440,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://localhost.corp.adobe.com:9000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  pageLoadTimeout: 500000,
  userEmail: 'cypress1@adobe.com',
  userPassword: 'ScotchB33r&1234567',
  defaultCommandTimeout: 60000,
  video: false,
  chromeWebSecurity: false
})
