const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const path = require('path')

require('dotenv').config({path: '../.env'});
// { path: path.resolve(__dirname, '../.env') }

console.log('should have .env here in s3, attempt to log process.env :', process.env);

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})


function uploadFile(fileBuffer, fileName, mimetype) {
  console.log('uploadFile called, here are types for bucketName, region, accessKeyId, secretAccessKey', typeof bucketName, typeof region, typeof accessKeyId, typeof secretAccessKey)
  console.log('printing types of arguments. fileBuffer :', typeof fileBuffer, typeof fileName, typeof mimetype);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }

  return s3Client.send(new PutObjectCommand(uploadParams));
}

function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

module.exports = {uploadFile, deleteFile}