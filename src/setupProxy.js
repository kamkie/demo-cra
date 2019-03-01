// @ts-ignore
const compression = require('compression');
const proxy = require('http-proxy-middleware');
const morgan = require('morgan');

module.exports = function (app) {
  app.set('x-powered-by', false);
  app.use(compression());

  app.use(morgan('[:remote-addr] [:date[iso]] ":method :url HTTP/:http-version" status: :status time: :response-time ms contentLength: :res[content-length] ref: ":referrer" userAgent: ":user-agent"'));

  app.use(proxy('/api', {target: 'http://localhost:8080/api'}));
};
