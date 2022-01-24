import { slackShare } from "./src/share";

const core = require("@actions/core");
const github = require("@actions/github");
const { WebClient } = require("@slack/web-api");
const fs = require("fs");

const runApp = async () => {
  try {
    const SLACK_TOKEN = core.getInput("SLACK_TOKEN");
    const SHARE_FILE = core.getInput("SHARE_FILE");
    const SLACK_CHANNEL = core.getInput("SLACK_CHANNEL");
    const FILE_PATH = core.getInput("FILE_PATH");
    const SLACK_MESSAGE = core.getInput("SLACK_MESSAGE");

    await slackShare(
      SLACK_TOKEN,
      SHARE_FILE,
      SLACK_CHANNEL,
      FILE_PATH,
      SLACK_MESSAGE
    );
  } catch (error: any) {
    core.setFailed(error.message);
  }
};

runApp();
