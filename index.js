// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates, // Add intent for voice state
    ],
  });
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('!')) {
      try {
        const replyMessage = await handleCommand(message);
        if (replyMessage) {
          message.reply(replyMessage);
        }
      }
      catch (err) {
        console.error(err);
        message.reply('error');
      }
    }
  });
  client.on(Events.MessageDelete, (message) => {
    if (message.author.bot) return;
    console.log(`${message.author.username}刪除了${message.content}`);
  });
  
  client.on(Events.MessageUpdate, (message) => {
    if (message.author.bot) return;
    console.log(
      `${message.author.username}更新了${message.content}改為${message.reactions.message.content}`,
    );
  });
  
// Log in to Discord with your client's token
client.login(token);