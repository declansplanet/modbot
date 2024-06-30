# Following is pasted from the bot this was coded from. 
# Welcome to scrappy-bot, FrankieFms' Discord bot!
> Developed and maintained by [@YP501](https://github.com/YP501)

This repository is made open source for the purpose of transparency and for people who are interested in how this bot works behind the scenes.

## Self-hosting
> Self-hosting is allowed, although it's not recommended since this bot is focused on the FrankieFmsLIVE server and contains some hardcoded values and is therefor likely to not work on other servers.
> If any of the fields/ values are not filled in or wrong, the bot won't start.

**Steps on self-hosting:**
1. Clone the repository with `git clone https://github.com/YP501/scrappy-bot.git` and `cd` into the folder
2. Install the node modules with `yarn install` or `npm install`
3. Add a .env file in the root folder with the following values:
```
tokenDev = "your bot token here"
dbAuthDev = "your mongo authentication uri here"
```
4. Tweak the id's and values in `./src/config.js` to match the ones of your server and preferences
5. Run `node main.js`
6. Pray it works

## Notes
- You are allowed to self-host this bot but you are not allowed to impersonate this bot as Frankie's bot.
- You **MUST** credit the original author of this repository when self-hosting and **CANNOT** claim it as your own.
- This bot was previously named Helikopter Bot and was renamed to Scrappy Bot.
