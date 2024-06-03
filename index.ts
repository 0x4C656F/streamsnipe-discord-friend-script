import { Client, GatewayIntentBits } from "discord.js";
import notifier from "node-notifier";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DISCORD_BOT_TOKEN || !process.env.FRIEND_DISCORD_ID) {
  console.error("Please provide DISCORD_BOT_TOKEN and FRIEND_DISCORD_ID");
  process.exit(1);
}

const token = process.env.DISCORD_BOT_TOKEN;
const friendUserID = [process.env.FRIEND_DISCORD_ID];

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("presenceUpdate", (oldPresence, newPresence) => {
  if (friendUserID.includes(newPresence.user?.id as string)) {
    if (newPresence.status === "online") {
      console.log(`${newPresence.user?.tag} is online!`);
      notifier.notify(
        {
          title: "Discord Notification".toUpperCase(),
          message: `${newPresence.user?.tag} is now online!`,
          sound: true,
          wait: true,
        },
        function (err, response) {
          if (err) {
            console.error(err);
          }
        }
      );
    }
  }
});

client.login(token);
