require('dotenv').config()
const { Octokit } = require('@octokit/rest')

module.exports = {
  async getLastCommit() {
    const octokit = new Octokit({
      auth: process.env.GITHUB_PASSWORD
    })
    const [owner, repo] = [
      process.env.GITHUB_USER,
      process.env.GITHUB_REPO || 'covid19cubadata.github.io'
    ]
    const data = await octokit.repos.listCommits({
      owner,
      repo
    })
    console.log(data)
    return data
  },
  async startTracking() {
    let data = {}
    let job = new CronJob(
      '* */30 * * * *',
      async function () {
        //runs every 30 minutes in this config
        data = await this.getLastCommit()
      },
      null,
      true,
      null,
      null,
      true
    )
    job.start()
    return data
  },
  async sendNotification(noti) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '*****@gmail.com',
        pass: '*****'
      }
    })

    let textToSend = 'Price dropped to ' + noti
    let htmlText = `<a href=\"${url}\">Link</a>`

    let info = await transporter.sendMail({
      from: '"Repo Tracker" <*****@gmail.com>',
      to: '*****@gmail.com',
      subject: 'Price dropped to ' + noti,
      text: textToSend,
      html: htmlText
    })

    console.log('Message sent: %s', info.messageId)
  }
}
