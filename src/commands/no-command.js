'use strict';

const colors = require(`colors/safe`);
const fs = require(`fs`);
const readline = require(`readline`);
const util = require(`util`);

const packageInfo = require(`../../package.json`);
const utils = require(`../utils`);
const {ENTITY_FILE_DEFAULT_PATH, Question, Message} = require(`../utils/constants`);
const generateEntity = require(`../generate-entity`);

let rl;

const getRl = () => {
  if (typeof rl === `undefined`) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  return rl;
};

const onExit = (message) => {
  console.log(message);
  process.exit(0);
};

const ask = (question) => new Promise((res) => getRl().question(question, (resp) => res(resp)));

const openFile = util.promisify(fs.open);

const runFileCreation = async () => {
  try {
    const userResp = await ask(Question.SHOULD_GENERATE);
    onUserResponse(userResp);
    const entitiesNumber = await ask(Question.ENTITIES_NUMBER);
    const castedNumber = +entitiesNumber;
    utils.isCorrectPrimitiveType(castedNumber, `number`, Message.WRONG_TYPE_NUMBER);
    const path = await ask(Question.PATH);
    await createFile(path, castedNumber);
  } catch (err) {
    if (err === Message.WRONG_COMMAND) {
      console.log(Message.WRONG_COMMAND);
      await runFileCreation();
    } else if (err === Message.LEAVE) {
      onExit(err);
    } else if (err === Message.WRONG_TYPE_NUMBER) {
      console.log(Message.WRONG_TYPE_NUMBER);
      await runFileCreation();
    } else {
      throw new Error(err);
    }
  }
};

const onUserResponse = (userResp) => {
  if (utils.isYes(userResp)) {
    return `ok`;
  } else if (utils.isNo(userResp)) {
    throw Message.LEAVE;
  } else {
    throw Message.WRONG_COMMAND;
  }
};

const createFile = async (path, quantity) => {
  const adjustedPath = path ? path : ENTITY_FILE_DEFAULT_PATH;
  const data = utils.generateData(quantity, generateEntity);
  try {
    await openFile(adjustedPath, `r`);
  } catch (err) {
    if (err && err.code === `ENOENT`) {
      writeDataToFile(adjustedPath, data, `w`);
      return;
    }
  }
  const userResp = await ask(Question.ALREADY_EXISTS);
  try {
    await onUserResponse(userResp);
  } catch (err) {
    if (err === Message.LEAVE) {
      onExit(err);
    } else if (err === Message.WRONG_COMMAND) {
      console.log(Message.WRONG_COMMAND);
      await createFile(adjustedPath, quantity);
    }
  }
  writeDataToFile(adjustedPath, data, `w`);
};

const writeDataToFile = (path = ENTITY_FILE_DEFAULT_PATH, data, flag) => {
  const dataStr = JSON.stringify(data);
  const fileWriteOptions = {encoding: `utf-8`, mode: 0o666, flag};
  fs.writeFile(path, dataStr, fileWriteOptions, () => {
    console.log(`File has been successfully saved`);
    getRl().close();
  });
};

module.exports = {
  name: `no-command`,
  description: `Greets the user and suggests to generate data`,
  async execute() {
    console.log(`Hello user! This program will start the server of the "${colors.blue(`keksobooking`)}" app.
${colors.grey(`Author`)}: ${colors.green(packageInfo.author)}`);
    try {
      await runFileCreation();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
};
