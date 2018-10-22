'use strict';

const http = require(`http`);
const path = require(`path`);
const url = require(`url`);
const fs = require(`fs`);
const colors = require(`colors/safe`);

const {Command, MIME_TYPE, DEFAULT_PORT, HOSTNAME} = require(`./constants`);

const getValidPort = (typedArgs, defaultPort) => {
  const customPort = typedArgs.reduce((acc, value, i) => {
    if (value === Command.SERVER) {
      const portIndex = i + 1;
      return acc + +typedArgs[portIndex];
    }
    return acc;
  }, 0);
  const isPortValid = !isNaN(customPort) && typeof customPort === `number`;
  return isPortValid ? customPort : defaultPort;
};

const getValidPathname = (pathname) => {
  const sanitizedPathname = pathname.replace(`..`, ``);
  const ext = path.extname(sanitizedPathname);
  return ext ? sanitizedPathname : `/index.html`;
};

const onRequest = (req, res) => {
  const urlObj = url.parse(req.url);
  const validPathname = getValidPathname(urlObj.pathname);
  const relativePath = path.join(process.cwd(), `static`, validPathname);
  const ext = path.extname(relativePath);
  fs.readFile(relativePath, (err, data) => {
    if (err && err.code === `ENOENT`) {
      res.statusCode = 404;
      res.end();
      return;
    }
    if (err) {
      console.error(err);
      res.statusCode = 400;
      res.end(`Couldn't retrieve the requested data`);
      return;
    }
    res.statusCode = 200;
    res.setHeader(`Content-Type`, MIME_TYPE[ext] || `text/plain`);
    res.end(data);
  });
};

const onListen = (port) => {
  console.log(`Server running at http://${HOSTNAME}:${port}/`);
};

const onServerError = (err) => {
  if (err.code === `EADDRINUSE`) {
    throw new Error(`This port is already in use. Try to specify another one.`);
  }
};

module.exports = {
  name: `server`,
  description: `Starts a server on the specified port. The default port is ${colors.blue(DEFAULT_PORT)}`,
  execute() {
    const server = http.createServer(onRequest);
    const port = getValidPort(process.argv, DEFAULT_PORT);
    server.listen(port, HOSTNAME, () => onListen(port));
    server.on(`error`, onServerError);
  }
};
