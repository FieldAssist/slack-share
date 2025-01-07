import { ErrorCode, WebClient } from "@slack/web-api";
import * as fs from "fs";

export const slackShare = async (
  SLACK_TOKEN: string,
  SHARE_FILE: boolean,
  SLACK_CHANNEL: string,
  FILE_PATH: string,
  SLACK_MESSAGE: string
) => {
  const web = new WebClient("", {
    headers: { Authorization: `Bearer ${SLACK_TOKEN}` },
    retryConfig: { retries: 1 },
    rejectRateLimitedCalls: true,
  });

  var slackMessage = SLACK_MESSAGE;

  if (SHARE_FILE) {
    (async () => {
      try {
        // Post a message to the channel, and await the result.
        // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
        const result = await web.filesUploadV2({
          channel_id: SLACK_CHANNEL,
          initial_comment: slackMessage,
          file: fs.createReadStream(FILE_PATH),
          filename:FILE_PATH.split('/').pop()
      });

      const file = result.files?.[0]?.files?.[0] as any;

        console.log(
          `Successfully sent  file: ${file.name} to ${SLACK_CHANNEL} channel with timestamp: ${file.timestamp}`
        );
      } catch (e: any) {
        if (e.code === ErrorCode.PlatformError) {
          console.log(e.data);
        } else {
          // Some other error, oh no!
          console.log("Well, that was unexpected.");
        }
      }
    })();
  } else {
    (async () => {
      try {
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
      } catch (e: any) {
        if (e.code === ErrorCode.PlatformError) {
          console.log(e.data);
        } else {
          // Some other error, oh no!
          console.log("Well, that was unexpected.");
        }
      }
    })();
  }
};
