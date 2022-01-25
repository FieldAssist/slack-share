import { WebClient } from "@slack/web-api";
import * as fs from "fs";

export const slackShare = async (
  SLACK_TOKEN: string,
  SHARE_FILE: boolean,
  SLACK_CHANNEL: string,
  FILE_PATH: string,
  SLACK_MESSAGE: string
) => {
  const web = new WebClient(SLACK_TOKEN);
  var slackMessage = SLACK_MESSAGE;

  if (SHARE_FILE) {
    (async () => {
      // Post a message to the channel, and await the result.
      // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
      const result = await web.files.upload({
        channels: SLACK_CHANNEL,
        initial_comment: slackMessage,
        file: fs.createReadStream(FILE_PATH),
      });

      const file = result.file as any
      console.log(
        `Successfully sent  file: ${file.name} to ${SLACK_CHANNEL} channel with timestamp: ${file.timestamp}`
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
        `Successfully sent message to ${SLACK_CHANNEL} channel with timestamp: ${result.ts}`
      );
    })();
  }
};
