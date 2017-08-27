const AWSCFMonitor = require('aws-cf-monitor')
const req = require('require-yml')
const template = req('./stack')

const project_name = 'why82-backend'
const params = {
  StackName: `${project_name}-ci`,
  Parameters: [
    {
      ParameterKey: 'ProjectName',
      ParameterValue: project_name,
      UsePreviousValue: false
    }
  ],
  Capabilities: ['CAPABILITY_IAM'],
  TemplateBody: JSON.stringify(template)
}

AWSCFMonitor.createOrUpdateStack(params)
  .then((finalStatus) => {
    console.log(`Hooray, the stack is ${finalStatus}`);
  })
  .catch(console.error)
