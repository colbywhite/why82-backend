const AWS = require('aws-sdk')
const Promise = require('bluebird')
const s3 = Promise.promisifyAll(new AWS.S3())

const save = (key, content) => {
  console.log('Saving to', key)
  const params = {
    Bucket: process.env.DATA_BUCKET,
    Key: key,
    ContentType: 'application/json',
    Body: content
  }
  return s3.putObjectAsync(params)
}

module.exports = {
  save: save
}
