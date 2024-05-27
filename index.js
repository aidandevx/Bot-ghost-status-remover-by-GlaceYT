const { Client, GatewayIntentBits, ActivityType, TextChannel, EmbedBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => GatewayIntentBits[a]),
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

const statusMessages = ["@24kozyy On Tiktok", "linktr.ee/iamkozyy", ".gg/kozyy"];
let currentIndex = 0;

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatus() {
  const currentStatus = statusMessages[currentIndex];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom }],
    status: 'dnd',
  });

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatus();

  setInterval(() => {
    updateStatus();
  }, 10000);
});

// Command handling
client.on('messageCreate', async message => {
  if (message.content === '/events') {
    try {
      const response = await axios.get('https://fortniteapi.io/v1/events/list', {
        headers: { 'Authorization': process.env.FORTNITE_API_KEY }
      });
      
      const events = response.data.events;
      if (events && events.length > 0) {
        const embed = new EmbedBuilder()
          .setTitle('Fortnite Events')
          .setColor(0x1E90FF);

        events.forEach(event => {
          embed.addFields(
            { name: event.name, value: `Start: ${event.beginTime}\nEnd: ${event.endTime}`, inline: false }
          );
        });

        message.channel.send({ embeds: [embed] });
      } else {
        message.channel.send('No events found.');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      message.channel.send('An error occurred while fetching events.');
    }
  }
});

login();
