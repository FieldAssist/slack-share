import { WebClient } from "@slack/web-api";
import * as fs from "fs";

export const slackShare = async (
  SLACK_TOKEN: string,
  SHARE_FILE: string,
  SLACK_CHANNEL: string,
  FILE_PATH: string,
  SLACK_MESSAGE: string
) => {
  const web = new WebClient(SLACK_TOKEN);
  var slackMessage = SLACK_MESSAGE;

  if (SHARE_FILE === "t") {
    (async () => {
      // Post a message to the channel, and await the result.
      // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
      const result = await web.files.upload({
        channels: SLACK_CHANNEL,
        initial_comment: slackMessage,
        file: fs.createReadStream(FILE_PATH),
      });

      // The result contains an identifier for the message, `ts`.
      console.log(
        `Successfully send message ${result.ts} in conversation ${SLACK_CHANNEL}`
      );
    })();
  } else {
    (async () => {
      // Post a message to the channel, and await the result.
      // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
      const result = await web.chat.postMessage({
        text: slackMessage,
        channel: SLACK_CHANNEL,
      });

      // The result contains an identifier for the message, `ts`.
      console.log(
        `Successfully send message ${result.ts} in conversation ${SLACK_CHANNEL}`
      );
    })();
  }
};
