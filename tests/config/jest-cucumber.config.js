const { loadFeature, defineFeature } = require('jest-cucumber');

module.exports = {
  featureFilePath: 'tests/bdd/features',
  stepDefinitions: 'tests/bdd/step_definitions',
  supportCodePaths: ['tests/bdd/support'],
  cucumberOpts: {
    require: ['tests/bdd/step_definitions/*.js'],
    format: ['pretty', 'json:reports/cucumber.json'],
    tags: '@happy_path or @edge_case or @negative_case'
  }
};