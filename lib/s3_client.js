const AWS = require('aws-sdk')
const Promise = require('bluebird')
const s3 = Promise.promisifyAll(new AWS.S3())

const save = (key, content_string) => {
  console.log('Saving to', key)
  const params = {
    Bucket: process.env.DATA_BUCKET,
    Key: key,
    ContentType: 'application/json',
    Body: content_string
  }
  return s3.putObjectAsync(params)
}

const save_json = (key, content_object) => {
  return save(key, JSON.stringify(content_object)).then(() => content_object)
}

module.exports = {
  save_json: save_json,
  save: save
}
