"use strict";
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
const share_1 = require("./src/share");
const core = require("@actions/core");
const github = require("@actions/github");
const { WebClient } = require("@slack/web-api");
const fs = require("fs");
const runApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SLACK_TOKEN = core.getInput("SLACK_TOKEN");
        const SHARE_FILE = core.getInput("SHARE_FILE");
        const SLACK_CHANNEL = core.getInput("SLACK_CHANNEL");
        const FILE_PATH = core.getInput("FILE_PATH");
        const SLACK_MESSAGE = core.getInput("SLACK_MESSAGE");
        yield (0, share_1.slackShare)(SLACK_TOKEN, SHARE_FILE, SLACK_CHANNEL, FILE_PATH, SLACK_MESSAGE);
    }
    catch (error) {
        core.setFailed(error.message);
    }
});
runApp();
