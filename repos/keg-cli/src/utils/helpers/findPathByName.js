const { getFolderContent } = require('KegFileSys/fileSys')
const { isArr } = require('@svkeg/jsutils')

/**
 * Searches a path recursively for a file or folder by name
 * @param {string} context - Context or name of repo to get the location of
 * @param {string} name - Name of file to find
 * @param {boolean} [opts.full=true] - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 * @param {Array} opts.exclude - File or folder to exclude
 * @param {Array} opts.include - File or folder to include
 *
 * @returns {Object} - Contains feature and steps local and remote locations 
 */
const findPathByName = async (contextPath, name, opts={}) => {
  const defExclude = [ 'node_modules', '.git', '.github', '.vscode' ]
  return getFolderContent(contextPath, {
    ...opts,
    include: [ name ],
    full: opts.full || true,
    recursive: opts.recursive || true,
    exclude: isArr(opts.exclude) ? opts.exclude.concat(defExclude) : defExclude,
  })
}

module.exports = {
  findPathByName
}

