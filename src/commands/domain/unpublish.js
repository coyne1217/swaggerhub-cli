const { getDomainIdentifierArg, splitPathParams } = require('../../support/command/parse-input')
const BaseCommand = require('../../support/command/base-command')
const UpdateCommand = require('../../support/command/update-command')

class UnpublishCommand extends UpdateCommand {
  
  async run() {
    const { args } = this.parse(UnpublishCommand)
    const domainPath = getDomainIdentifierArg(args)
    const [owner, name, version] = splitPathParams(domainPath)

    await this.updatePublish('domains', owner, name, version, false)
  }
}

UnpublishCommand.description = 'unpublish a domain version'

UnpublishCommand.examples = [
  'swaggerhub domain:unpublish organization/domain/1.0.0'
]

UnpublishCommand.args = [{ 
  name: 'OWNER/DOMAIN_NAME/VERSION',
  required: true,
  description: 'Domain identifier'
}]

UnpublishCommand.flags = BaseCommand.flags

module.exports = UnpublishCommand
