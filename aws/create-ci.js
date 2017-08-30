const AWSCFMonitor = require('aws-cf-monitor')
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.resolve(__dirname,'./stack.yaml'), 'utf8');

const project_name = 'why82-backend'
const stage = 'prod'
const params = {
  StackName: `${project_name}-${stage}-ci`,
  Parameters: [
    {
      ParameterKey: 'ProjectName',
      ParameterValue: project_name,
      UsePreviousValue: false
    },
    {
      ParameterKey: 'Stage',
      ParameterValue: stage,
      UsePreviousValue: false
    }
  ],
  Capabilities: ['CAPABILITY_IAM'],
  TemplateBody: template
}

AWSCFMonitor.createOrUpdateStack(params)
  .then((finalStatus) => {
    console.log(`Hooray, the stack is ${finalStatus}`);
  })
  .catch((err) => {
    console.error('ERROR: code', err.code)
    console.error('ERROR: statusCode', err.statusCode)
    console.error('ERROR: message', err.message)
    process.exit(err.statusCode)
  })
