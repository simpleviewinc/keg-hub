const path = require('path')
const { DOCKER } = require('KegConst/docker')
const { getTask } = require('KegMocks/helpers/testTasks')
const { deepMerge, get, uuid } = require('@keg-hub/jsutils')
const { allowedTagOpts } = require('../../../getters/getTagVarMap')
const { containerContexts } = require('KegMocks/contexts/containerContexts')

const globalConfig = global.getGlobalCliConfig()

const defParams = {
  local: false,
  tags: undefined,
  version: undefined,
  tagVariable: undefined,
  tagGit: false,
  tagPackage: false,
  from: undefined,
  pull: true,
  cache: true,
  log: false,
  env: 'development',
}

const testTask = {
  ...getTask(),
  options: {
    tagVariable: {
      allowed: allowedTagOpts,
      description: 'test tag option',
    }
  }
}

const args = {
  base: {
    globalConfig,
    task: testTask,
    command: 'base',
    containerContext: containerContexts.base,
    params: {
      ...defParams,
      context: 'base',
      tap: 'base',
      location: DOCKER.CONTAINERS.BASE.ENV.KEG_CONTEXT_PATH,
      cmd: 'build',
      image: 'keg-base',
      buildArgs: {
        ...DOCKER.CONTAINERS.BASE.ENV,
      },
    },
  },
  core: {
    globalConfig,
    task: testTask,
    command: 'core',
    containerContext: containerContexts.core,
    params: {
      ...defParams,
      context: 'core',
      tap: 'core',
      location: DOCKER.CONTAINERS.CORE.ENV.KEG_CONTEXT_PATH,
      cmd: 'core',
      image: 'keg-core',
      buildArgs: {
        ...DOCKER.CONTAINERS.CORE.ENV,
      },
    },
  },
  comp: {
    globalConfig,
    task: testTask,
    command: 'components',
    containerContext: containerContexts.components,
    params: {
      ...defParams,
      context: 'components',
      tap: 'components',
      location: DOCKER.CONTAINERS.COMPONENTS.ENV.KEG_CONTEXT_PATH,
      cmd: 'components',
      image: 'keg-components',
      buildArgs: {
        ...DOCKER.CONTAINERS.COMPONENTS.ENV,
      },
    },
  }
}

const buildParams = (type, overrides) => {
  return deepMerge(get(args, [ type, 'params']), overrides)
}

const { tagFromVersion } = require('../tagFromVersion')

describe('tagFromVersion', () => {

  afterAll(() => jest.resetAllMocks())

  it('should the version from the params when passed', async () => {

    const baseVer = await tagFromVersion(buildParams('base', { version: 'base-version' }), args.base)
    expect(baseVer).toBe('base-version')

    const coreVer = await tagFromVersion(buildParams('core', { version: 'core-version' }), args.core)
    expect(coreVer).toBe('core-version')

    const compVer = await tagFromVersion(buildParams('comp', { version: 'comp-version' }), args.comp)
    expect(compVer).toBe('comp-version')

  })

  it('should return the version from ENVs when no param or package.json version', async () => {

    const baseVer = await tagFromVersion(args.base.params, args.base)
    expect(baseVer).toBe(DOCKER.CONTAINERS.BASE.ENV.VERSION)

    const coreVer = await tagFromVersion(args.core.params, args.core)
    expect(coreVer).toBe(DOCKER.CONTAINERS.CORE.ENV.VERSION)

    const compVer = await tagFromVersion(args.comp.params, args.comp)
    expect(compVer).toBe(DOCKER.CONTAINERS.COMPONENTS.ENV.VERSION)

  })

  it('should return the version from package.json when tagPackage is true', async () => {

    const tagPackage = true

    const coreLoc = DOCKER.CONTAINERS.CORE.ENV.KEG_CONTEXT_PATH
    const corePackage = require(path.join(coreLoc, './package.json'))
    const coreVer = await tagFromVersion(buildParams('core', { tagPackage }), args.core)
    expect(coreVer).toBe(corePackage.version)

    const compLoc = DOCKER.CONTAINERS.COMPONENTS.ENV.KEG_CONTEXT_PATH
    const compPackage = require(path.join(compLoc, './package.json'))
    const compVer = await tagFromVersion(buildParams('comp', { tagPackage }), args.comp)
    expect(compVer).toBe(compPackage.version)

  })

})