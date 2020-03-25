let SHOW_LOGS;
let METH_DEF = 'dir';
let PREFIX = 'type';
const LOG_TYPES = ['error', 'info', 'log', 'dir', 'warn'];
const setLogs = (log, methDef, prefix) => {
  SHOW_LOGS = log;
  METH_DEF = methDef || METH_DEF || 'log';
  PREFIX = prefix || PREFIX || 'type';
};
const resetLogs = () => {
  SHOW_LOGS = undefined;
  METH_DEF = 'log';
  PREFIX = 'type';
};
const logData = (...args) => {
  if (!args.length) return;
  let type = args.length === 1 ? METH_DEF : args.pop();
  if (!SHOW_LOGS && type !== 'error') return;else if (typeof args[0] === 'string') {
    if (PREFIX === 'type') args[0] = `[ ${type.toUpperCase()} ] ${args[0]}`;else if (PREFIX) args[0] = `${PREFIX} ${args[0]}`;
  }
  LOG_TYPES.indexOf(type) !== -1 ? console[type](...args) : console[METH_DEF](...args, type);
};

export { logData, resetLogs, setLogs };
