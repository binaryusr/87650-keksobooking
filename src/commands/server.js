'use strict';

const colors = require(`colors/safe`);

const app = require(`../app`);
const {Command, DEFAULT_PORT, HOSTNAME} = require(`../constants`);

const getValidPort = (typedArgs, defaultPort) => {
  const customPort = typedArgs.reduce((acc, it, i) => {
    if (it === Command.SERVER) {
      const portIndex = i + 1;
      return parseInt(typedArgs[portIndex], 10);
    }
    return null;
  });
  const isPortValid = !isNaN(customPort) && typeof customPort === `number`;
  return isPortValid ? customPort : defaultPort;
};

module.exports = {
  name: `server`,
  description: `Starts a server on the specified port. The default port is ${colors.blue(DEFAULT_PORT)}`,
  execute() {
    const port = getValidPort(process.argv, DEFAULT_PORT);
    app.listen(port, () => console.log(`Server running at http://${HOSTNAME}:${port}/`));
  }
};
