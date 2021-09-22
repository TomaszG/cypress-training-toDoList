const mongoose = require('mongoose');

const initDb = async config => {
  mongoose.connection.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('Successfully connected to MongoDB');
  });
  await mongoose.connect(config.env.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
  return null;
};

const tearDownDb = async () => {
  await mongoose.disconnect();
  return null;
};

const clearDb = async () => {
  await mongoose.connection.dropDatabase();
  return null;
};

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('task', {
    initDb: async () => await initDb(config),
    tearDownDb,
    clearDb,
  });
};
