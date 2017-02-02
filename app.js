'use strict';

const SwaggerExpress = require('swagger-express-mw');
const passport = require('passport');
const app = require('express')();

const { loggerMiddleware, logger } = require('./middlewares/logger');

const config = {
  appRoot: __dirname, // required config
};

require('./initializers/passport');

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  app.use(passport.initialize());
  swaggerExpress.register(app);

  app.use(loggerMiddleware());

  const port = process.env.PORT || 10010;
  app.listen(port);

  logger.info({ port }, 'Server started');
});

module.exports = app; // for testing
