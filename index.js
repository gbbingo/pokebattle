require('dotenv').config()
const { Client, Intents, MessageEmbed } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.author.bot) return
  if (msg.content.toLowerCase().startsWith('!battle gym1')) {
    GymOne(msg)
  } else if (msg.content.toLowerCase().startsWith('!battle gym2')) {
    GymTwo(msg)
  } else {
    if (msg.content.toLowerCase().startsWith('!bat')) {
      msg.channel.send('I think you tried starting a battle, but your fingers slipped. Better luck next time!')
    }
  }
  if (msg.content.toLowerCase().startsWith('!map')) {
    msg.channel.send('https://i.imgur.com/665isUW.png')
  }
})

async function GymOne(msg) {
  const confirmation = await msg.channel.send('Would you like to continue with this team? [Bear Cub, Nibbler, Bunny]\r\nType `!yes` to start the battle or `!no` to change your team setup')
  // filter checks if the response is from the author who typed the command
  const filter = (m) => m.author.id === msg.author.id;
  // set up a message collector to check if there are any responses
  const collector = confirmation.channel.createMessageCollector(filter, {
    // set up the max wait time the collector runs (optional)
    time: 6000,
  })

  // Fires when a response is collected
  collector.on('collect', async (msg) => {
    if (msg.content.toLowerCase().startsWith('!yes')) {
      msg.channel.send('Gym leader Turael sends out Chicken (LVL 2)')
      await new Promise(r => setTimeout(r, 1000))
      msg.channel.send('You send out Bear Cub (LVL 3)')
      await new Promise(r => setTimeout(r, 1000))
      msg.channel.send('https://i.imgur.com/bYgtDk4.png')
      collector.stop()
    }
    if (msg.content.toLowerCase().startsWith('!no')) {
      msg.channel.send('Turael: Come back and visit when you aren\'t feeling...CHICKEN!')
      collector.stop()
    }
  });

  // Fires when the collector is finished collecting
  collector.on('end', async (collected, reason) => {
    // Only send a message when the "end" event fires because of timeout
    if (reason === 'time') {
      msg.channel.send(
        `${msg.author}, it's been a minute without any input. I'm ending the battle!`,
      )
    }
  })
}

async function GymTwo(msg) {
  msg.channel.send('*Mazchna notices you haven\'t earned the Asgarnia Gym badge from Turael. He pretends you don\'t exist.*')
  await new Promise(r => setTimeout(r, 2000))
  msg.channel.send('You: That\'s pretty toxic, but he also stands next to a swamp all day...so yeah.')
}

client.login(process.env.DISCORD_BOT_TOKEN)