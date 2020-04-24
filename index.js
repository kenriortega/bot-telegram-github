require('dotenv').config()
const Telegraf = require('telegraf')
const { getLastCommit, startTracking } = require('./github')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async ctx => {
  let data = await startTracking()
  ctx.reply(`Hi ${ctx.from.first_name} the last commit for awas: ${data[0]}`)
})

bot.launch()
