const prodConfig = require('./ProdConfig');
const localConfig = require('./LocalConfig');
module.exports = {
  ...(process.env.environment === 'prod' ? prodConfig : localConfig)
};
