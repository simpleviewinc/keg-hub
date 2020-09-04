const ngrok = require('ngrok')
const qrcode = require('qrcode-terminal')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')

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

  const dockerIP = DOCKER.PREFIXED.KEG_DOCKER_IP
  const srcUri = source || port || dockerIP
  
  Logger.header('Starting tunnel...', 'white')

  const tunnelUrl = await ngrok.connect(srcUri)

  Logger.spacedMsg('Source:', Logger.color('magenta', srcUri))
  Logger.spacedMsg('Tunnel:', Logger.color('green', tunnelUrl))

  // show a qr code on the terminal that the user can use to quickly access the tunnel on a mobile device
  qr && qrcode.generate(tunnelUrl, { small: false })
}

module.exports = {
  tunnel: {
    name: 'tunnel',
    alias: [ 't', 'tl', 'tn', 'tnl', 'tun', 'ngrok' ],
    action: tunnel,
    description: 'Creates a public tunnel to the running docker container available at kegdev.xyz',
    example: 'keg docker tunnel <options>',
    options: {
      qr:  {
        description: 'if true, `tunnel` will display a qr code that encodes the tunnel\'s public uri. This can make connecting a mobile device to the tunnel much easier.',
        example: 'keg docker tunnel --qr false',
        default: true,
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