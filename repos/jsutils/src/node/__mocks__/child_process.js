
const execCmdNotFound = `ps -A | grep "[n]ot found"`
const execBashCmd = `ps -A | grep "[/]bin/bash"`
const execOutputs = {
  [execBashCmd]: {
    string: `    41757 ttys005    0:32.33 /bin/bash (figterm)
    33272 ttys008    0:04.96 /bin/bash (figterm)
    33281 ttys009    0:01.67 /bin/bash --login`,
    json: [
      {
        tty: 'ttys005',
        time: '0:32.33',
        cmd: '/bin/bash (figterm)',
        procName: '/bin/bash',
        running: true,
        pid: 41757
      },
      {
        tty: 'ttys008',
        time: '0:04.96',
        cmd: '/bin/bash (figterm)',
        procName: '/bin/bash',
        running: true,
        pid: 33272
      },
      {
        tty: 'ttys009',
        time: '0:01.67',
        cmd: '/bin/bash --login',
        procName: '/bin/bash',
        running: true,
        pid: 33281
      },
    ],
  },
}

const child_process = {
  exec: jest.fn((cmd, cb) => {
    if(cmd === execCmdNotFound) throw new Error(`Command not found`)
  
    const output = execOutputs[cmd]
    return output ? cb(null, output.string) : cb(new Error(`Command not found`))
  })
}

module.exports = {
  execBashCmd,
  execOutputs,
  child_process,
  execCmdNotFound,
}