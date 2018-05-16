// create and export config variables

// container for environments

const environments = {};

// staging object (default)

environments.staging = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'envName': "staging"
};

//production object

environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName': "production"
};


// determine export of environment as CLI argument

const currentEnvironment = typeof(process.env.NODE_ENV) == "string" ? process.env.NODE_ENV.toLowerCase() : "";

// check current environment  if equal to our presets

const environmentToExport = typeof(environments[currentEnvironment]) == "object" ? environments[currentEnvironment] : environments.staging;

//export module
module.exports = environmentToExport;



