module.exports = {
  ...require('./generateComposeLabels'),
  ...require('./getProxyDomainFromBranch'),
  ...require('./getProxyDomainFromLabel'),
}