# slack-share action

This action lets you share files and messages to the slack channels.
## Inputs

### `SLACK_TOKEN`

**Required** Your slack token. Default `"No Token"`.
### `SLACK_CHANNEL`

**Required** Name of channel you want to interact with. Default `"general"`.

### `SHARE_FILE`

**Optional** Set `true` if you want to share file. Default `false`.

### `FILE_PATH`

**Optional** Path of file you want to share on slack. Default `""`.

### `SLACK_MESSAGE`

**Optional** The message you want to send. Default `""`.


## Setting up this github action
1. Creating Slack bot<br>
    follow this guide to create a slack app and bot <br>
    [https://slack.com/intl/en-in/help/articles/115005265703-Create-a-bot-for-your-workspace](https://slack.com/intl/en-in/help/articles/115005265703-Create-a-bot-for-your-workspace)
    <br>
    Don't forget to install this bot/app to your workspace and then add it in your slack channel.

2. Getting action token and saving it to github repo<br>
Since slack token is sensitive info, so don't save it in your yaml file instead save it in github secrets.
  - Getting token
    - Open your App on Slack, https://api.slack.com/apps/
    - Click on "OAuth & Permissions" > "Bot User OAuth Access Token"
    - Copy the Bot User OAuth Access Token
  - Save Token to your github repo
    - Open your Github Repo
    - Click on "Settings" > "Secrets"
    - Create a new repository secret called YOUR_APP_NAME_BOT_AUTH_ACCESS_TOKEN (you can name your token whatever you want),<br>and then paste the value of Bot User OAuth Access Token.
    - Done
3. Setting up github action
 - Open your Github Repo
 - Click on Actions
 - Search and configure or create your github action
 - Commit a new yml file
 - Done

## Example usage
```yml
uses: FieldAssist/slack-share@v0.1.4
with:
  SLACK_TOKEN: 'Your token'
  SHARE_FILE: true
  SLACK_CHANNEL: 'random' # Your slack channel name or id
  FILE_PATH: 'your/file/path'
  SLACK_MESSAGE: 'Your Slack message'
```