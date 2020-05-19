const path = require('path')
const { writeJSONSync, fileExistsSync } = require('../support/fs')
const { configDefaults } = require('../../package.json').oclif
const { pipe } = require('../utils/compositions')

const createConfigFile = (filePath, config) => writeJSONSync(filePath, config)

const createConfigPath = ({ configDir }) => path.join(configDir, 'config.json')

const initConfig = filePath => !fileExistsSync(filePath) && createConfigFile(filePath, configDefaults)

const setAsGlobalPath = filePath => global.configFilePath = filePath

const setAsGlobalUserAgent = ({ userAgent, name, ...rest }) => {
  global.shUserAgent = userAgent.replace(name, `${name}-cli`)
  return rest
}

const SetupConfig = async ({ config: defaults }) => (
  pipe(defaults)(setAsGlobalUserAgent, createConfigPath, setAsGlobalPath, initConfig)
)

module.exports = SetupConfig
