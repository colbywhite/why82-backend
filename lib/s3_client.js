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

const list = (prefix, type) => {
  console.log(`Listing for '${prefix}' files of type ${type}`)
  const params = {
    Bucket: process.env.DATA_BUCKET,
    Delimiter: `${type}.json`,
    Prefix: prefix
  }
  return s3.listObjectsAsync(params).then((list) => list.CommonPrefixes.map((p) => p.Prefix).sort())
}

const read = (key) => {
  console.log('Reading from', key)
  const params = {
    Bucket: process.env.DATA_BUCKET,
    Key: key
  }
  return s3.getObjectAsync(params).then((data) => data.Body.toString('utf-8'))
}

const readLatest = (prefix, type) => {
  return list(prefix, type)
    .then((results) => results.pop())
    .then(read)
}

const save_json = (key, content_object) => {
  return save(key, JSON.stringify(content_object)).then(() => content_object)
}

module.exports = {
  readLatest: readLatest,
  read: read,
  list: list,
  save_json: save_json,
  save: save
}
