import { readFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

export const env = {
  environment: "dev",
  getToken: function () {
    return this.environment === "main" ? process.env.token_main : process.env.token_dev;
  },
  getMongoUri: function () {
    return this.environment === "main" ? process.env.db_main : process.env.db_dev;
  },
};

export const bot = {
  guild_id: "1132283133031620669",
  application_id: "1256575608054611989",
  version: JSON.parse(readFileSync("./package.json")).version,
};

export const settings = {
  commandCooldown: 3 * 1000,
  maxReasonLength: 500,
  min_Xp: 15,
  max_Xp: 30,
  xpCooldown: 30 * 1000,
  emojis: {
    check: "<:checkmark:1257050735703494788",
    cross: "<:crossmark_red_x:1257051051882971297>",
    warning: "<:scrappy_warning:1257051157554004100>",
  },
  channels: {
    logging: {
      ban: "1232771130788675706",
      blacklist: "1232771130788675706",
      filter_review: "1132287622014836789",
      kick: "1232771130788675706",
      lock: "1132288088203350127", // same for unlock
      purge: "1132288088203350127",
      timeout: "1232771130788675706",
      warn: "1232771130788675706",
      events: {
        messageUpdate: "1232771130788675706",
        messageDelete: "1232771130788675706",
        guildMemberAdd: "1232771130788675706",
        guildMemberRemove: "1232771130788675706",
      },
    },
  },
  roles: {
    permissions: {
      ban: "1132289450089660447",
      blacklist: "1132289450089660447",
      infraction: "1132289450089660447",
      kick: "1132289450089660447",
      levels: "1132289450089660447",
      lock: "1132289450089660447", // same for unlock
      mod_actions: "1132289450089660447",
      purge: "1132289450089660447",
      resync: "1132289450089660447",
      timeout: "1132289450089660447",
      warn: "1132289450089660447",
    },
    systems: {
      filterBypass: "1132289450089660447",
    },
  },
  appealServerInvite: "https://discord.gg/NZmt7qKwVJ",
};
