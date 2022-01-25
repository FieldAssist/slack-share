import { slackShare } from "./src/share";

import * as core from "@actions/core";

const runApp = async () => {
  try {
    const SLACK_TOKEN = core.getInput("SLACK_TOKEN");
    const SHARE_FILE = core.getBooleanInput("SHARE_FILE");
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
