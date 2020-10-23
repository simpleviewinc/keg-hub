const semver = require('semver')
const { Logger } = require('KegLog')
const { getHubRepos } = require('KegUtils/hub/getHubRepos')
const { reduceObj, mapObj, get, set } = require('@keg-hub/jsutils')

/**
 * Loops over a repos dependencies and compares it with all other repo dependencies
 * @param {string} repo - Name of the current repo to build the map for
 * @param {Object} allDependencies - All dependencies from the keg-hub repos
 * @param {Object} dependencies - Dependencies of the current repo
 * @param {string} type - Type of dependencies from the package.json of the current repo
 *
 * @returns {Object} - Mapped dependencies version mismatches
 */
const loopDependency = (repo, allDependencies, dependencies, type) => {
  return reduceObj(dependencies, (dependency, version, updated) => {
    !updated.cache[dependency]
      ? (updated.cache[dependency] = { [repo]: { version, type } })
      : (updated.versions[dependency] = {
          ...updated.cache[dependency],
          ...updated.versions[dependency],
          [repo]: { version, type }
        })

    return updated
  }, allDependencies)
}

/**
 * Builds a dependency map of all repos dependencies
 * @param {Object} allDependencies - All dependencies from the keg-hub repos
 * @param {Object} package - The package.json of the current repo
 * @param {string} repo - Name of the current repo to build the map for
 *
 * @returns {Object} - Mapped dependencies version mismatches
 */
const buildDepMap = (allDependencies, package, repo) => {
  const { dependencies, devDependencies, peerDependencies } = package
  let mappedDependencies = loopDependency(
    repo,
    allDependencies,
    devDependencies,
    'devDependencies',
  )

  mappedDependencies = loopDependency(
    repo,
    mappedDependencies,
    dependencies,
    'dependencies'
  )

  return loopDependency(
    repo,
    mappedDependencies,
    peerDependencies,
    'peerDependencies'
  )
}

/**
 * Loops over all versions of dependencies and finds the differences
 * @param {Object} versions - All dependencies and their versions
 *
 * @returns {Object} - Mapped dependencies version mismatches
 */
const diffDepVersions = versions => {
  return reduceObj(versions, (depName, mapped, mismatch) => {
    mapObj(mapped, (repo, meta) => {
      mapObj(mapped, (altRepo, altMeta) => {
        if(altRepo === repo) return
        
        try {

          semver.neq(
            semver.coerce(meta.version),
            semver.coerce(altMeta.version)
          ) && ( mismatch[depName] = {
            ...mismatch[depName],
            [repo]: meta,
            [altRepo]: altMeta,
          })

        }
        catch(err){
          console.log(
            `\n`,
            `Error - ${err.message}\n`,
            `Dependency - ${depName}\n`,
            `Repo - ${repo} | Version - ${meta.version}\n`,
            `Other Repo - ${altRepo} | Other Version - ${altMeta.version}\n`,
          )
        }
      })
    })

    return mismatch
  })
}

/**
 * Formats all dependencies mismatches to be printed
 * @param {Object} mismatched - All mismatched repos
 *
 * @returns {Object} - Dependencies to be rendered
 */
const formatMismatches = mismatched => {
  return reduceObj(mismatched, (depName, mapped, toRender) => {
    mapObj(mapped, (repo, meta) => {
      toRender[depName] = toRender[depName] || {}
      toRender[depName][meta.version] = toRender[depName][meta.version] || []
      toRender[depName][meta.version].push(repo)
    })

    return toRender
  })
}

/**
 * Prints out the found mismatches dependencies of the keg-hub repos
 * @param {Object} formatted - Dependencies, repos and versions
 *
 * @returns {void}
 */
const displayMismatches = formatted => {
  Logger.header(`Mismatched Dependencies`)

  mapObj(formatted, (depName, mapped) => {
    Logger.pair(`  Dependency:`, depName)

    mapObj(mapped, (version, repos) => {
      Logger.pair(`    ${version}:`, repos.join(', '))
    })

    Logger.empty()
  })
}

/**
 * Compares the package.json dependencies
 * <br/>Finds all dependencies that are mismatched and prints out their versions
 * @param {Object} repos - Meta data for all repos of the keg-hub
 *
 * @returns {void}
 */
const compareVersions = repos => {
  const allDependencies = { cache: {}, versions: {} }
  repos.map(({ repo, package }) => buildDepMap(allDependencies, package, repo))
  const mismatched = diffDepVersions(allDependencies.versions)
  const formatted = formatMismatches(mismatched)

  displayMismatches(formatted)
}

const updateVersion = (repos, update) => {
  // TODO: Add code from other branch to update the versions
}

/**
 * Get information about the keg-hub repos information
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const hubDeps = async args => {
  const { params } = args
  const { update } = params
  const repos = []

  await getHubRepos({ ...params, callback: (repo, package, { location }) => {
    repos.push({
      repo,
      package,
      location,
    })
  }})

  compareVersions(repos)
  update && updateVersion(repos)

  return repos
}

module.exports = {
  dependencies: {
    name: 'dependencies',
    alias: [ 'deps', 'dep', 'dp'],
    action: hubDeps,
    description: `Gets information about keg-hub repos dependencies`,
    example: 'keg hub dependencies <options>',
    options: {
      context: {
        alias: [ 'ctx', 'filter', 'ftr', 'scope', 'scp' ],
        description: 'Filter results based on a repo(s) name',
        example: 'keg hub dependencies --scope cli',
        default: 'all'
      },
      update: {
        alias: [ 'up' ],
        description: 'Updates a specific dependency in all repos where it exists',
        example: 'keg hub dependencies --update <dependency>:<version>',
        default: true
      }
    }
  }
}
