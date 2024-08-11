const { cleanEnv, str, url } = require('envalid');
const dotenv = require('dotenv');

const { parsed } = dotenv.config();

const config = Object.assign({}, parsed);

const env = cleanEnv(config, {
});

module.exports = function (transform) {
  const clone = Object.assign({}, env);

  if (transform) {
    Object.keys(env).forEach(key => {
      clone[`process.env.${key}`] = transform(env[key]);
    });
  }

  return clone;
};
