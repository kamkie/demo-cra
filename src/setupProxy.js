/* eslint-disable no-console,@typescript-eslint/no-var-requires */
// @ts-ignore
const compression = require('compression');
const proxy = require('http-proxy-middleware').createProxyMiddleware;
const morgan = require('morgan');
require('dotenv-flow').config();

const contextPath = process.env.CONTEXT_PATH === '/' ? '' : process.env.CONTEXT_PATH || '';
console.log('contextPath:', contextPath);

module.exports = function(app) {
  app.set('x-powered-by', false);
  app.use(compression());

  app.use(
    morgan(
      '[:remote-addr] [:date[iso]] ":method :url HTTP/:http-version" status: :status time: :response-time ms contentLength: :res[content-length] ref: ":referrer" userAgent: ":user-agent"',
    ),
  );

  const proxyConfig = {
    changeOrigin: true,
    logLevel: 'debug',
    secure: false,
  };

  app.use(
    `${contextPath}/actuator`,
    proxy(
      Object.assign({}, proxyConfig, {
        target: 'https://we.jit.team',
        pathRewrite: { [`^${contextPath}/actuator`]: '/actuator' },
      }),
    ),
  );
  app.use(`${contextPath}/api`, proxy(Object.assign({}, proxyConfig, { target: 'http://localhost:8080/api' })));
};
