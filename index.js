const { Client, GatewayIntentBits, ActivityType, TextChannel, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Powered By RTX`);
});

const statusMessages = ["made by kozyy","make sure to verify!",".gg/kozyy"];
let currentIndex = 0;
const channelId = '1242544641627263026';

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];
  const nextStatus = statusMessages[(currentIndex + 1) % statusMessages.length];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom}],
    status: 'dnd',
  });

  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
    textChannel.send(`Bot status is: ${currentStatus}`);
  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000);
});

client.on('guildMemberAdd', member => {
  const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!welcomeChannel) return;

  const welcomeEmbed = new EmbedBuilder()
    .setColor('#FF69B4') // Set the color of the embed
    .setTitle('Welcome To The Server!')
    .setDescription(`Welcome ${member}! We Are Glad You Joined Us,`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true })) // User's avatar as thumbnail
    .setFooter({ text: 'KozyyBot 2.0 • Made With ❤️ By kozyy.' });

  welcomeChannel.send({ embeds: [welcomeEmbed] });
});

login();
