const ngrok = require('ngrok')
const qrcode = require('qrcode-terminal')
const { Logger } = require('KegLog')

/**
 * Create a public tunnel the the url (by default, to `kegdev.xyz`)
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.params - arguments passed from the command line
 *
 * @returns {void}
 */
const tunnel = async args => {
  const { params } = args
  const { qr, source, port } = params

  const ip = process.env.KEG_DOCKER_IP

  Logger.header('Starting tunnel...', 'white')

  const url = await ngrok.connect(source || port || ip)

  Logger.spacedMsg('Source:', Logger.color('magenta', ip))
  Logger.spacedMsg('Tunnel:', Logger.color('green', url))

  // show a qr code on the terminal that the user can use to quickly access the tunnel on a mobile device
  qr && qrcode.generate(url, { small: false })
}

module.exports = {
  tunnel: {
    name: 'tunnel',
    alias: ['t', 'tl', 'ngrok' ],
    action: tunnel,
    description: 'Creates a public tunnel to the running docker container available at kegdev.xyz',
    example: 'keg docker tunnel <options>',
    options: {
      qr:  {
        description: 'if true, `tunnel` will display a qr code that encodes the tunnel\'s public uri. This can make connecting a mobile device to the tunnel much easier.',
        example: 'keg docker tunnel --qr',
      },
      source: {
        description: "optional override for the source url or ip of the tunnel. By default, this command tunnels kegdev.xyz",
        alias: [ 'src', 'url', 'ip' ],
        example: "keg docker tunnel --src http://localhost:19006"
      },
      port: {
        description: 'optional override for the source of the tunnel, using this specified port of localhost instead.',
        example: 'keg docker tunnel --port 19006',
      }
    }
  }
}