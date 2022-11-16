"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slackShare = void 0;
const web_api_1 = require("@slack/web-api");
const fs = __importStar(require("fs"));
const slackShare = (SLACK_TOKEN, SHARE_FILE, SLACK_CHANNEL, FILE_PATH, SLACK_MESSAGE) => __awaiter(void 0, void 0, void 0, function* () {
    const web = new web_api_1.WebClient("", {
        headers: { Authorization: `Bearer ${SLACK_TOKEN}` },
        retryConfig: { retries: 1 },
        rejectRateLimitedCalls: true,
    });
    var slackMessage = SLACK_MESSAGE;
    if (SHARE_FILE) {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Post a message to the channel, and await the result.
                // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
                const result = yield web.files.upload({
                    channels: SLACK_CHANNEL,
                    initial_comment: slackMessage,
                    file: fs.createReadStream(FILE_PATH),
                });
                const file = result.file;
                console.log(`Successfully sent  file: ${file.name} to ${SLACK_CHANNEL} channel with timestamp: ${file.timestamp}`);
            }
            catch (e) {
                if (e.code === web_api_1.ErrorCode.PlatformError) {
                    console.log(e.data);
                }
                else {
                    // Some other error, oh no!
                    console.log("Well, that was unexpected.");
                }
            }
        }))();
    }
    else {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Post a message to the channel, and await the result.
                // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
                const result = yield web.chat.postMessage({
                    text: slackMessage,
                    channel: SLACK_CHANNEL,
                });
                // The result contains an identifier for the message, `ts`.
                console.log(`Successfully sent message to ${SLACK_CHANNEL} channel with timestamp: ${result.ts}`);
            }
            catch (e) {
                if (e.code === web_api_1.ErrorCode.PlatformError) {
                    console.log(e.data);
                }
                else {
                    // Some other error, oh no!
                    console.log("Well, that was unexpected.");
                }
            }
        }))();
    }
});
exports.slackShare = slackShare;
