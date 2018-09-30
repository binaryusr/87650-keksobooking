'use strict';

const execute = require(`./src/execute`);
const args = process.argv.slice(2);

try {
  execute(args[0]);
} catch (err) {
  console.error(err);
  process.exit(1);
}
